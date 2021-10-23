package execute

import (
	"encoding/hex"
	shell "github.com/ipfs/go-ipfs-api"
	"log"
	"os/exec"
	"time"
)

type Message struct {
	Action string `json:"action"`
	Data   struct {
		File  []byte `json:"file"`
		Event string `json:"event"`
		Code  string `json:"code"`
	} `json:"data"`
}

func executeLambdaDocker(data string) string {
	cmd := "docker"
	args := []string{
		"run", "--rm", "-v", FunctionPath + ":/var/task",
		"lambci/lambda:python3.7", FunctionName, data,
	}
	out, err := exec.Command(cmd, args...).Output()
	if err != nil {
		if err, ok := err.(*exec.ExitError); ok {
			log.Fatal(string(err.Stderr))
		}
		log.Fatal(err)
	}
	return string(out)
}

func ListenForExecute() {
	// Where your local node is running on localhost:5001
	sh := shell.NewShell("localhost:5001")
	sub, _ := sh.PubSubSubscribe(RequestTopic)
	for true {
		r, _ := sub.Next()

		//fmt.Println(string(r.Data))

		out := executeLambdaDocker(hex.EncodeToString(r.Data))

		// fmt.Println(out)

		sh.PubSubPublish(ResponseTopic, out)

		time.Sleep(time.Second)
	}
}
