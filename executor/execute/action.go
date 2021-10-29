package execute

import (
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/bytecodealliance/wasmtime-go"
	"github.com/ipfs/go-cid"
	"io"
	"io/ioutil"
	"os"
	"os/exec"
	"path"
	"strconv"
)

type FxABI struct {
	MainFn   string
	Bytecode cid.Cid
	Args     []string
}

func deployCodes(codes []byte, mainFn string, args []string) (codesCid cid.Cid, abiCid cid.Cid, err error) {
	// deploy codes
	codesCidStr, err := sh.Add(bytes.NewReader(codes))
	if err != nil {
		fmt.Printf("deploy codes failed, error: %v\n", err)
		return
	}

	codesCid, err = cid.Decode(codesCidStr)
	if err != nil {
		fmt.Printf("invalid cid format, error: %v\n", err)
		return
	}

	fmt.Printf("codes deployd at: %v\n", codesCid)

	// deploy api
	abi := FxABI{
		MainFn:   mainFn,
		Bytecode: codesCid,
		Args:     args,
	}
	marshalledAbi, _ := json.Marshal(abi)
	abiCidStr, err := sh.Add(bytes.NewReader(marshalledAbi))
	if err != nil {
		fmt.Printf("failed to deploy abi, error: %v\n", err)
		return
	}

	fmt.Printf("abi deployed at: %v\n", abiCidStr)

	abiCid, err = cid.Decode(abiCidStr)
	if err != nil {
		fmt.Printf("invalid cid format, error: %v\n", err)
		return
	}

	return
}

func compile(codes []byte) (wasmFilePath string, err error) {
	const BaseDir = "/tmp/kencloud"
	const SrcDir = "/tmp/kencloud/src"
	const MainFile = "lib.rs"
	const OutFile = "kencloud.wasm"
	const CargoFile = "Cargo.toml"
	const CargoConf = `[package]
name = "kencloud"
version = "0.1.0"
authors = ["ben <xuqiang056@gmail.com>"]
edition = "2021"

[dependencies]

[lib]
crate-type = ['cdylib']

[package.metadata]
wasm-opt = false`

	if _, err = os.Stat(BaseDir); os.IsNotExist(err) {
		if err = os.Mkdir(BaseDir, 0766); err != nil {
			fmt.Printf("failed to create kencloud dir, error: %v\n", err)
			return
		}
	} else {
		dir, _ := ioutil.ReadDir(BaseDir)
		for _, d := range dir {
			err = os.RemoveAll(path.Join([]string{BaseDir, d.Name()}...))
			if err != nil {
				return
			}
		}
	}

	if err = os.Mkdir(SrcDir, 0766); err != nil {
		fmt.Printf("failed to create src dir, error: %v\n", err)
		return
	}

	cargoFile := path.Join(BaseDir, CargoFile)
	err = ioutil.WriteFile(cargoFile, []byte(CargoConf), 0644)
	if err != nil {
		return
	}

	srcFile := path.Join(SrcDir, MainFile)
	if err = ioutil.WriteFile(srcFile, codes, 0644); err != nil {
		fmt.Printf("write file failed, error: %v\n", err)
		return
	}

	cmd := exec.Command("/Users/ben/.cargo/bin/cargo", "wasi", "build", "--release")
	cmd.Dir = BaseDir
	_, err = cmd.Output()
	if err != nil {
		fmt.Printf("compile go program failed, error: %v\n", err)
		return
	}
	wasmFilePath = path.Join(BaseDir, "target/wasm32-wasi/release", OutFile)

	return
}

func invoke(abiCid cid.Cid) (result interface{}, err error) {
	abiStream, err := sh.Cat(abiCid.String())
	if err != nil {
		fmt.Printf("cat abi failed, cid: %v\nerror: %v\n", abiCid.String(), err)
		return
	}
	defer func(abiStream io.ReadCloser) {
		_ = abiStream.Close()
	}(abiStream)

	abiBytes, _ := ioutil.ReadAll(abiStream)
	abi := FxABI{}
	err = json.Unmarshal(abiBytes, &abi)
	if err != nil {
		fmt.Printf("unmarshal abi bytes failed, error: %v\n", err)
		return
	}

	codeBytes, err := sh.Cat(abi.Bytecode.String())
	if err != nil {
		fmt.Printf("cat code bytes failed, error: %v\n", err)
		return
	}
	defer func(codeBytes io.ReadCloser) {
		_ = codeBytes.Close()
	}(codeBytes)

	codes, err := ioutil.ReadAll(codeBytes)
	wasmFilePath, err := compile(codes)
	if _, err = os.Stat(wasmFilePath); os.IsNotExist(err) {
		fmt.Printf("file %v does not exist\n", wasmFilePath)
		return
	}

	module, err := wasmtime.NewModuleFromFile(WasmRuntime.Engine, wasmFilePath)
	if err != nil {
		fmt.Printf("new wasm module failed, error: %v\n", err)
		return
	}

	instance, err := wasmtime.NewInstance(WasmRuntime, module, []wasmtime.AsExtern{})
	if err != nil {
		fmt.Printf("new instance failed, error: %v\n", err)
		return
	}

	fn := instance.GetExport(WasmRuntime, "fx").Func()
	if len(abi.Args) != 0 {
		var arg int64
		arg, err = strconv.ParseInt(abi.Args[0], 10, 32)
		if err != nil {
			fmt.Printf("arg %v cannot convert to int32: %v\n", abi.Args[0], err)
			return
		}
		result, err = fn.Call(WasmRuntime, int32(arg))
		if err != nil {
			fmt.Printf("call function failed, error: %v\n", err)
			return
		}
	} else {
		result, err = fn.Call(WasmRuntime)
		if err != nil {
			fmt.Printf("call function failed, error: %v\n", err)
			return
		}
	}

	return
}
