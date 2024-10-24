package opeoutput

import (
	"bytes"
	"context"
	"crypto/tls"
	_ "embed"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"strings"
	"time"

	osapi "github.com/opensearch-project/opensearch-go/v4/opensearchapi"
	osapiutil "github.com/opensearch-project/opensearch-go/v4/opensearchutil"
	"github.com/sirupsen/logrus"
	"go.k6.io/k6/output"
)

type openSearchMetricEntry struct {
	MetricName   string
	MetricType   string
	MetricTestID string
	Value        float64
	Tags         map[string]string
	Time         time.Time
}

type Output struct {
	config          Config
	client          *osapi.Client
	bulkIndexer     osapiutil.BulkIndexer
	periodicFlusher *output.PeriodicFlusher
	output.SampleBuffer
	logger logrus.FieldLogger
}

var _ output.Output = new(Output)

//go:embed mapping.json
var mapping []byte

func New(params output.Params) (output.Output, error) {

	config, err := NewConfig(params)
	if err != nil {
		return nil, err
	}

	var addresses = []string{config.Address.ValueOrZero()}

	var osConfig osapi.Config

	if config.Address.Valid {
		osConfig.Client.Addresses = strings.Split(strings.Join(addresses, ""), ",")
	}
	if config.Username.Valid {
		osConfig.Client.Username = config.Username.String
	}
	if config.Password.Valid {
		osConfig.Client.Password = config.Password.String
	}

	osConfig.Client.Transport = &http.Transport{
		TLSClientConfig: &tls.Config{InsecureSkipVerify: config.InsecureSkipVerify},
	}

	osConfig.Client.Transport = &http.Transport{
		TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
	}
	client, err := osapi.NewClient(osConfig)
	if err != nil {
		return nil, err
	}

	info, err := client.Info(context.Background(), nil)
	if err != nil {
		return nil, err
	}
	fmt.Println(info.Version)
	if info.Inspect().Response.StatusCode != 200 {

		return nil, fmt.Errorf("can not connect to OpenSearch (status code %d)", info.Inspect().Response.StatusCode)

	}

	bulkIndexer, err := osapiutil.NewBulkIndexer(osapiutil.BulkIndexerConfig{
		Index:  config.IndexName.String,
		Client: client,
		OnError: func(ctx context.Context, err error) {
			params.Logger.Errorf("Could not write metrics: %s", err)
		},
	})
	if err != nil {
		return nil, fmt.Errorf("error creating the indexer: %v", err)
	}

	return &Output{
		client:      client,
		bulkIndexer: bulkIndexer,
		config:      config,
		logger:      params.Logger,
	}, nil
}

func (*Output) Description() string {
	return "Output k6 metrics to OpenSearch"
}

func (o *Output) Start() error {
	indexName := o.config.IndexName.String

	res, err := o.client.Indices.Create(
		context.Background(),
		osapi.IndicesCreateReq{
			Index: o.config.IndexName.String,
			Body:  bytes.NewReader(mapping),
		},
	)

	if err != nil {
		if strings.Contains(err.Error(), "resource_already_exists_exception") {
			fmt.Printf("index already exists: %s", indexName)
		} else {
			return fmt.Errorf("could not create index %s: %s", indexName, err.Error())
		}
	}
	if res.Inspect().Response.StatusCode > 400 {
		body, err := io.ReadAll(res.Inspect().Response.Body)
		if err != nil {
			return fmt.Errorf("could not read response after failure to create index %s: %v", indexName, err)
		}
		return fmt.Errorf("could not create index %s: %s", indexName, body)
	}
	res.Inspect().Response.Body.Close()

	if periodicFlusher, err := output.NewPeriodicFlusher(time.Duration(o.config.FlushPeriod), o.flush); err != nil {
		return err
	} else {
		o.periodicFlusher = periodicFlusher
	}
	o.logger.Debugf("OpenSearch: starting writing to index %s", indexName)

	return nil
}

func (o *Output) Stop() error {
	o.logger.Debug("OpenSearch: Stopping writing to index")
	o.periodicFlusher.Stop()
	if err := o.bulkIndexer.Close(context.Background()); err != nil {
		log.Fatalf("OpenSearch: Could not close bulk indexer: %s", err)
	}
	return nil
}

func (o *Output) flush() {
	samplesContainers := o.GetBufferedSamples()
	for _, samplesContainer := range samplesContainers {
		samples := samplesContainer.GetSamples()

		for _, sample := range samples {
			mappedSampleEntry := openSearchMetricEntry{
				MetricName:   sample.Metric.Name,
				MetricType:   sample.Metric.Type.String(),
				MetricTestID: o.config.TestId,
				Value:        sample.Value,
				Tags:         sample.GetTags().Map(),
				Time:         sample.Time,
			}
			data, err := json.Marshal(mappedSampleEntry)
			if err != nil {
				o.logger.Fatalf("Cannot encode document: %s, %s", err, mappedSampleEntry)
			}
			err = o.bulkIndexer.Add(
				context.Background(),
				osapiutil.BulkIndexerItem{
					Action: "create",
					Body:   bytes.NewReader(data),
					OnFailure: func(
						ctx context.Context,
						item osapiutil.BulkIndexerItem,
						res osapi.BulkRespItem, err error,
					) {
						if err != nil {
							o.logger.Errorf("%s", err)
						} else {
							o.logger.Errorf("%s: %s", res.Error.Type, res.Error.Reason)
						}
					},
				},
			)
			if err != nil {
				log.Fatalf("Unexpected error: %s", err)
			}
		}
	}
}
