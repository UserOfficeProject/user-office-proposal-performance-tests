package log

import (
	"fmt"
	"io"
	"strings"
	"time"

	"go.k6.io/k6/metrics"
	"go.k6.io/k6/output"
)

// init is called by the Go runtime at application startup.
func init() {
	output.RegisterExtension("logger", New)
}

// Logger writes k6 metric samples to stdout.
type Logger struct {
	out io.Writer
}

// New returns a new instance of Logger.
func New(params output.Params) (output.Output, error) {
	return &Logger{params.StdOut}, nil
}

// Description returns a short human-readable description of the output.
func (*Logger) Description() string {
	return "logger"
}

// Start initializes any state needed for the output, establishes network
// connections, etc.
func (o *Logger) Start() error {
	return nil
}

// AddMetricSamples receives metric samples from the k6 Engine as they're emitted.
func (l *Logger) AddMetricSamples(samples []metrics.SampleContainer) {
	for _, sample := range samples {
		all := sample.GetSamples()
		fmt.Fprintf(l.out, "timestamp=%s %s %s\n", all[0].GetTime().Format(time.RFC3339Nano), metricKeyValues(all),metricTagsValues(all[0].GetTags().Map()))
	}
}

// metricKeyValues returns a string of key-value pairs for all metrics in the sample.
func metricKeyValues(samples []metrics.Sample) string {
	names := make([]string, 0, len(samples))
	for _, sample := range samples {
		names = append(names, fmt.Sprintf("%s=%v", sample.Metric.Name, sample.Value))
	}
	return strings.Join(names, " ")
}

// metricTagsValues returns a string of key-value pairs for all tags in the sample.
func metricTagsValues(tags map[string]string) string {
	var sb strings.Builder
	for key, value := range tags {
		if value != "" {
            switch key {
            case "scenario", "method", "status", "group":
                sb.WriteString(fmt.Sprintf(" %s=%s ", key, value))  
            }
		}

	}
	return sb.String()
}

// Stop finalizes any tasks in progress, closes network connections, etc.
func (*Logger) Stop() error {
	return nil
}