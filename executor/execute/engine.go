package execute

import (
	"github.com/bytecodealliance/wasmtime-go"
)

var WasmRuntime = NewWasmRunTime()

func NewWasmRunTime() *wasmtime.Store {
	return wasmtime.NewStore(wasmtime.NewEngine())
}
