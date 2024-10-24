package opeoutput

import (
	"fmt"
	"strconv"
	"time"

	"go.k6.io/k6/output"
	"gopkg.in/guregu/null.v3"
)

const defaultFlushPeriod = 1 * time.Second
const defaultIndexName   = "k6-performance-metrics"

// Config is the config for the template collector
type Config struct {
	Address        null.String
	Username       null.String
	Password       null.String
	IndexName      null.String
	TestId         string
	InsecureSkipVerify bool
	MaxBulkSize    int
	FlushPeriod    time.Duration 
}


func NewConfig(p output.Params) (Config, error) {
	cfg := Config{
		Address:        null.StringFrom("https://localhost:9200"),
		Username:       null.NewString("admin", false),
		Password:       null.NewString("password", false),
		IndexName:      null.StringFrom(defaultIndexName),
		InsecureSkipVerify: false,
		FlushPeriod:    defaultFlushPeriod,
		TestId:         strconv.FormatInt(time.Now().UTC().UnixNano(), 10),
		MaxBulkSize:    2048,
	}
	
	for k, v := range p.Environment {
		switch k {
		case "K6_OPENSEARCH_FLUSH_PERIOD":
			var err error
			cfg.FlushPeriod, err = time.ParseDuration(v)
			if err != nil {
				return cfg, fmt.Errorf("error parsing environment variable 'K6_OPENSEARCH_FLUSH_PERIOD': %w", err)
			}

		case "K6_OPENSEARCH_ADDRESS":
			cfg.Address = null.StringFrom(v)

		case "K6_OPENSEARCH_USERNAME":
			cfg.Username =  null.StringFrom(v)

		case "K6_OPENSEARCH_PASSWORD":
			cfg.Password =  null.StringFrom(v)

		case "K6_OPENSEARCH_INDEX":
			cfg.IndexName =  null.StringFrom(v)

		case "K6_TEST_ID":
			cfg.TestId =  v

		case "K6_OPENSEARCH_INSECURE_SKIP_VERIFY":
			var err error
			cfg.InsecureSkipVerify, err = strconv.ParseBool(v)
			if err != nil {
				return cfg, fmt.Errorf("error parsing environment variable 'K6_ES_ENABLE_SNIFFER': %w", err)
			}

		case "K6_OPENSEARCH_MAX_BULKSIZE":
			var err error
			cfg.MaxBulkSize, err = strconv.Atoi(v)
			if err != nil {
				return cfg, fmt.Errorf("error parsing environment variable 'K6_ES_MAX_BULKSIZE': %w", err)
			}
		 }
	}

	return cfg, nil
}