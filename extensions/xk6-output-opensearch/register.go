package opeoutput

import (
	xk6ope "github.com/UserOfficeProject/user-office-proposal-performance-tests/extensions/xk6-output-opensearch/internal"
	"go.k6.io/k6/output"
)

func init() {
	output.RegisterExtension("xk6-output-opensearch", func(p output.Params) (output.Output, error) {
		return xk6ope.New(p)
	})
}

func New(p output.Params) {
	panic("unimplemented")
}