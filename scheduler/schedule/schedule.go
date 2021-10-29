package schedule

import (
	"bytes"
	"encoding/json"
	"fmt"
	shell "github.com/ipfs/go-ipfs-api"
)

type ExecutorServerInfo struct {
	RequestTopic  string
	ResponseTopic string
	PeerID        string
}

var schedulerMap = map[string]*ExecutorServerInfo{
	"client1": {
		RequestTopic:  "Request1",
		ResponseTopic: "Response1",
	},
	"client2": {
		RequestTopic:  "Request2",
		ResponseTopic: "Response2",
	},
	"client3": {
		RequestTopic:  "Request3",
		ResponseTopic: "Response3",
	},
}

func init() {
	ipfsApi := shell.NewShell("http://52.14.211.248:5001")
	for _, executorInfo := range schedulerMap {
		serializedInfo, _ := json.Marshal(executorInfo)
		executorCid, err := ipfsApi.Add(bytes.NewReader(serializedInfo))
		if err != nil {
			fmt.Printf("Err: add executor to ipfs failed, error: %v", err)
		}
		executorInfo.PeerID = executorCid
	}
}

func GetIdleExecutor(client string) (*ExecutorServerInfo, error) {
	servers := make([]*ExecutorServerInfo, 0)
	for _, serverInfo := range schedulerMap {
		servers = append(servers, serverInfo)
	}

	//return servers[rand.Intn(len(schedulerMap))], nil
	return schedulerMap["client1"], nil
}
