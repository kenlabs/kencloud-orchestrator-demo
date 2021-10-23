package execute

import (
	"github.com/mitchellh/go-homedir"
)

var FunctionPath, _ = homedir.Expand("/tmp")
const (
	RequestTopic  = "Request1"
	ResponseTopic = "Response1"
	// FunctionName todo: just for test
	FunctionName = "test_function.lambda_handler"
)
