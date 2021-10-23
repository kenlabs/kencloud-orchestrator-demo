package execute

import (
	b64 "encoding/base64"
	"encoding/json"
	"fmt"
	shell "github.com/ipfs/go-ipfs-api"
	"io/ioutil"
	"log"
	"os"
	"os/exec"
	"strings"
	"time"
)

type Message struct {
	Arg  string `json:"arg"`
	Code string `json:"code"`
}

func decodeUnwrap(encoded string) string {
	uEnv, _ := b64.URLEncoding.DecodeString(encoded)
	return string(uEnv)
}

func writeCodeToTempFile(code string) {
	fmt.Println("start writing the code in temp dir")
	path := FunctionPath // build the temp DIR
	if _, err := os.Stat(path); os.IsNotExist(err) {
		os.Mkdir(path, os.ModePerm)
	}

	// write the function file body to tmp
	err := ioutil.WriteFile(FunctionPath+"/"+strings.Split(FunctionName, ".")[0]+".py", []byte(code), 0644)
	if err != nil {
		panic(err)
	}
	fmt.Println("end writing code")
}

func executeLambdaDocker(data string) string {
	cmd := "docker"
	args := []string{
		"run", "--rm", "-v", FunctionPath + ":/var/task",
		"lambci/lambda:python3.7", FunctionName, data,
	}
	out, err := exec.Command(cmd, args...).Output()
	fmt.Println("got error while executing the work")
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
	sh := shell.NewShell("http://52.14.211.248:5001")
	sub, _ := sh.PubSubSubscribe(RequestTopic)
	for true {
		r, _ := sub.Next()

		//fmt.Println(string(r.Data))
		var msg Message
		err := json.Unmarshal(r.Data, &msg)
		if err != nil {
			fmt.Println(err)
		}
		code := decodeUnwrap(msg.Code)
		arg := msg.Arg
		writeCodeToTempFile(code)
		fmt.Println("executor starts working")
		out := executeLambdaDocker(arg)
		fmt.Println("got result from executor")
		// fmt.Println(out)
		fmt.Println("publish the result to pubsub")
		sh.PubSubPublish(ResponseTopic, out)

		fmt.Println("end rightly")
		time.Sleep(time.Second)
	}
}
