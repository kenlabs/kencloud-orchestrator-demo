package execute

import (
	"bytes"
	b64 "encoding/base64"
	"encoding/json"
	"fmt"
	shell "github.com/ipfs/go-ipfs-api"
	"io/ioutil"
	"log"
	"net/url"
	"os"
	"os/exec"
	"strings"
	"time"
)

type Message struct {
	Arg  string `json:"arg"`
	Code string `json:"code"`
}

type Response struct {
	CodesCid  string
	AbiCid    string
	ArgsCid   string
	ResultCid string
	Err       string
}

var sh = shell.NewShell("http://52.14.211.248:5001")

func decodeUnwrap(encoded string) string {
	encoded, _ = url.QueryUnescape(encoded)
	uEnv, _ := b64.StdEncoding.DecodeString(encoded)
	return string(uEnv)
}

func writeCodeToTempFile(code string) {
	fmt.Println("start writing the code in temp dir")
	path := FunctionPath // build the temp DIR
	if _, err := os.Stat(path); os.IsNotExist(err) {
		_ = os.Mkdir(path, os.ModePerm)
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

func ResponseError(err error) error {
	respObj := &Response{
		Err: err.Error(),
	}
	resp, _ := json.Marshal(respObj)

	err = sh.PubSubPublish(ResponseTopic, string(resp))
	if err != nil {
		return fmt.Errorf("publish error failed, error: %v", err)
	}
	fmt.Printf("responsed an error: %v\n", respObj)
	return nil
}

func checkErr(err error) bool {
	if err != nil {
		if err = ResponseError(err); err != nil {
			panic(err)
		}
		return true
	}
	return false
}

func ListenForExecute() {
	// Where your local node is running on localhost:5001
	sub, _ := sh.PubSubSubscribe(RequestTopic)
	for true {
		r, _ := sub.Next()

		var msg Message
		err := json.Unmarshal(r.Data, &msg)
		if checkErr(err) {
			continue
		}
		code := decodeUnwrap(msg.Code)
		codesCid, abiCid, err := deployCodes([]byte(code), "main", []string{msg.Arg})
		if checkErr(err) {
			continue
		}

		// execute codes
		result, err := invoke(abiCid)
		if checkErr(err) {
			continue
		}

		resultCid, err := sh.Add(bytes.NewReader([]byte(fmt.Sprint(result))))
		if checkErr(err) {
			continue
		}

		fmt.Println(result)
		// publish abi cid to response topic for test
		respObj := &Response{
			CodesCid:  codesCid.String(),
			AbiCid:    abiCid.String(),
			ResultCid: resultCid,
		}
		resp, _ := json.Marshal(respObj)
		err = sh.PubSubPublish(ResponseTopic, string(resp))
		if checkErr(err) {
			continue
		}
		fmt.Printf("responsed result: %v", respObj)

		time.Sleep(time.Second)
	}
}
