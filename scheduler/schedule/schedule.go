package schedule

import (
	cid "github.com/ipfs/go-cid"
	mh "github.com/multiformats/go-multihash"
	"log"
	"math/rand"
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
	pref := cid.Prefix{
		Version:  1,
		Codec:    cid.Raw,
		MhType:   mh.SHA2_256,
		MhLength: -1, // default length
	}

	for c, info := range schedulerMap {
		peercid, err := pref.Sum([]byte(c))
		if err != nil {
			log.Fatal(err)
		}
		info.PeerID = peercid.String()
	}
}

func ScheduleExecutorServer(client string) (*ExecutorServerInfo, error) {
	servers := make([]*ExecutorServerInfo, len(schedulerMap))
	for _, serverInfo := range schedulerMap {
		servers = append(servers, serverInfo)
	}

	return servers[rand.Intn(len(schedulerMap))], nil
}
