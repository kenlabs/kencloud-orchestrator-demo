(self["webpackChunkcompute_mesh_client"] = self["webpackChunkcompute_mesh_client"] || []).push([["main"],{

/***/ 63607:
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const main_1 = __webpack_require__(/*! ./main */ 48519);
window.onload = main_1.main;


/***/ }),

/***/ 48519:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.main = void 0;
const axios_1 = __importDefault(__webpack_require__(/*! axios */ 9669));
const ipfs_http_client_1 = __webpack_require__(/*! ipfs-http-client */ 85241);
const ace = __importStar(__webpack_require__(/*! ace-builds */ 53239));
__webpack_require__(/*! ace-builds/webpack-resolver */ 66245);
const FILE_LIMIT_MB = 1.5;
const FILE_LIMIT_BYTES = FILE_LIMIT_MB * 1024 * 1024;
const CLIENT_ID = "client1";
const IPFS_API = "/ip4/52.14.211.248/tcp/5001";
async function getExecutor() {
    const GET_URL = `http://localhost:8769/execute?client=${CLIENT_ID}`;
    try {
        const response = await axios_1.default.get(GET_URL, {
            headers: { 'Access-Control-Allow-Origin': '*' }
        });
        return response.data;
    }
    catch (exception) {
        console.log(`ERROR received from ${GET_URL}: ${exception}`);
    }
}
async function execute(code, value) {
    let executorInfo = await getExecutor();
    let requestTopic = executorInfo.message.RequestTopic;
    let responseTopic = executorInfo.message.ResponseTopic;
    console.log(`fetch executor topics: \n request=${requestTopic}\n response=${responseTopic}`);
    // @ts-ignore
    const ipfs = (0, ipfs_http_client_1.create)(IPFS_API);
    let msg = {
        'arg': value,
        'code': code
    };
    let str = JSON.stringify(msg);
    let data = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++) {
        data[i] = str.charCodeAt(i);
    }
    await ipfs.pubsub.publish(requestTopic, data);
    await ipfs.pubsub.subscribe(responseTopic, msg => {
        console.log(msg);
    });
}
function setupEditor() {
    const editor = ace.edit("editor", {
        mode: "ace/mode/html",
        theme: "ace/theme/dracula",
        maxLines: 30,
        minLines: 20,
        fontSize: 14,
    });
    editor.session.setMode("ace/mode/python");
    return editor;
}
function main() {
    const editor = setupEditor();
    const executeBtn = document.querySelector("#execute");
    executeBtn?.addEventListener("click", (e) => {
        const customCodes = editor.getValue();
        const fnValueInput = document.querySelector("#fn-value");
        if (fnValueInput == null) {
            console.log("fn-value input does not exist");
            return;
        }
        execute(customCodes, fnValueInput.value).then();
    });
}
exports.main = main;


/***/ }),

/***/ 47005:
/*!**********************!*\
  !*** http (ignored) ***!
  \**********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 26937:
/*!***********************!*\
  !*** https (ignored) ***!
  \***********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 26784:
/*!**************************************************!*\
  !*** ipfs-utils/src/files/glob-source (ignored) ***!
  \**************************************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 88795:
/*!********************************!*\
  !*** electron-fetch (ignored) ***!
  \********************************/
/***/ (() => {

/* (ignored) */

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors"], () => (__webpack_exec__(63607)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUM7SUFDckQsVUFBVSxFQUFFLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQVEsRUFBUSxFQUFFO1FBQ3JELE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUU7UUFDckMsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQXFCO1FBQzVFLElBQUksWUFBWSxJQUFJLElBQUksRUFBRTtZQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDO1lBQzVDLE9BQU07U0FDVDtRQUNELE9BQU8sQ0FBQyxXQUFXLEVBQUUsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBRTtJQUNuRCxDQUFDLENBQUM7QUFDTixDQUFDO0FBRU8sb0JBQUk7Ozs7Ozs7Ozs7O0FDekVaOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY29tcHV0ZS1tZXNoLWNsaWVudC8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9jb21wdXRlLW1lc2gtY2xpZW50Ly4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vY29tcHV0ZS1tZXNoLWNsaWVudC9pZ25vcmVkfC9Vc2Vycy9iZW4vZm9yd29yay9rZW5sYWJzL2NvbXB1dGUtbWVzaC1jbGllbnQvbm9kZV9tb2R1bGVzL2lwZnMtaHR0cC1jbGllbnQvc3JjL2xpYnxodHRwIiwid2VicGFjazovL2NvbXB1dGUtbWVzaC1jbGllbnQvaWdub3JlZHwvVXNlcnMvYmVuL2Zvcndvcmsva2VubGFicy9jb21wdXRlLW1lc2gtY2xpZW50L25vZGVfbW9kdWxlcy9pcGZzLWh0dHAtY2xpZW50L3NyYy9saWJ8aHR0cHMiLCJ3ZWJwYWNrOi8vY29tcHV0ZS1tZXNoLWNsaWVudC9pZ25vcmVkfC9Vc2Vycy9iZW4vZm9yd29yay9rZW5sYWJzL2NvbXB1dGUtbWVzaC1jbGllbnQvbm9kZV9tb2R1bGVzL2lwZnMtaHR0cC1jbGllbnQvc3JjfGlwZnMtdXRpbHMvc3JjL2ZpbGVzL2dsb2Itc291cmNlIiwid2VicGFjazovL2NvbXB1dGUtbWVzaC1jbGllbnQvaWdub3JlZHwvVXNlcnMvYmVuL2Zvcndvcmsva2VubGFicy9jb21wdXRlLW1lc2gtY2xpZW50L25vZGVfbW9kdWxlcy9pcGZzLXV0aWxzL3NyY3xlbGVjdHJvbi1mZXRjaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge21haW59IGZyb20gJy4vbWFpbic7XG5cbndpbmRvdy5vbmxvYWQgPSBtYWluOyIsImltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIlxuaW1wb3J0IHtjcmVhdGUgYXMgSXBmc0h0dHBDbGllbnR9IGZyb20gJ2lwZnMtaHR0cC1jbGllbnQnXG5pbXBvcnQgKiBhcyBhY2UgZnJvbSAnYWNlLWJ1aWxkcyc7XG5pbXBvcnQgJ2FjZS1idWlsZHMvd2VicGFjay1yZXNvbHZlcic7XG5cblxuY29uc3QgRklMRV9MSU1JVF9NQiA9IDEuNTtcbmNvbnN0IEZJTEVfTElNSVRfQllURVMgPSBGSUxFX0xJTUlUX01CICogMTAyNCAqIDEwMjQ7XG5jb25zdCBDTElFTlRfSUQgPSBcImNsaWVudDFcIjtcbmNvbnN0IElQRlNfQVBJID0gXCIvaXA0LzUyLjE0LjIxMS4yNDgvdGNwLzUwMDFcIjtcblxuYXN5bmMgZnVuY3Rpb24gZ2V0RXhlY3V0b3IoKTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCBHRVRfVVJMID0gYGh0dHA6Ly9sb2NhbGhvc3Q6ODc2OS9leGVjdXRlP2NsaWVudD0ke0NMSUVOVF9JRH1gO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5nZXQoR0VUX1VSTCwge1xuICAgICAgICAgICAgaGVhZGVyczogeydBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiAnKid9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YVxuICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgICBjb25zb2xlLmxvZyhgRVJST1IgcmVjZWl2ZWQgZnJvbSAke0dFVF9VUkx9OiAke2V4Y2VwdGlvbn1gKTtcbiAgICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGV4ZWN1dGUoY29kZTogU3RyaW5nLCB2YWx1ZTogU3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbGV0IGV4ZWN1dG9ySW5mbyA9IGF3YWl0IGdldEV4ZWN1dG9yKClcbiAgICBsZXQgcmVxdWVzdFRvcGljID0gZXhlY3V0b3JJbmZvLm1lc3NhZ2UuUmVxdWVzdFRvcGljXG4gICAgbGV0IHJlc3BvbnNlVG9waWMgPSBleGVjdXRvckluZm8ubWVzc2FnZS5SZXNwb25zZVRvcGljXG4gICAgY29uc29sZS5sb2coYGZldGNoIGV4ZWN1dG9yIHRvcGljczogXFxuIHJlcXVlc3Q9JHtyZXF1ZXN0VG9waWN9XFxuIHJlc3BvbnNlPSR7cmVzcG9uc2VUb3BpY31gKVxuXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNvbnN0IGlwZnMgPSBJcGZzSHR0cENsaWVudChJUEZTX0FQSSk7XG4gICAgbGV0IG1zZyA9IHtcbiAgICAgICAgJ2FyZyc6IHZhbHVlLFxuICAgICAgICAnY29kZSc6IGNvZGVcbiAgICB9XG4gICAgbGV0IHN0ciA9IEpTT04uc3RyaW5naWZ5KG1zZylcbiAgICBsZXQgZGF0YSA9IG5ldyBVaW50OEFycmF5KHN0ci5sZW5ndGgpXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZGF0YVtpXSA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgIH1cbiAgICBhd2FpdCBpcGZzLnB1YnN1Yi5wdWJsaXNoKHJlcXVlc3RUb3BpYywgZGF0YSlcbiAgICBhd2FpdCBpcGZzLnB1YnN1Yi5zdWJzY3JpYmUocmVzcG9uc2VUb3BpYywgbXNnID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cobXNnKVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIHNldHVwRWRpdG9yKCk6IGFjZS5BY2UuRWRpdG9yIHtcbiAgICBjb25zdCBlZGl0b3IgPSBhY2UuZWRpdChcImVkaXRvclwiLCB7XG4gICAgICAgIG1vZGU6IFwiYWNlL21vZGUvaHRtbFwiLFxuICAgICAgICB0aGVtZTogXCJhY2UvdGhlbWUvZHJhY3VsYVwiLFxuICAgICAgICBtYXhMaW5lczogMzAsXG4gICAgICAgIG1pbkxpbmVzOiAyMCxcbiAgICAgICAgZm9udFNpemU6IDE0LFxuICAgIH0pO1xuICAgIGVkaXRvci5zZXNzaW9uLnNldE1vZGUoXCJhY2UvbW9kZS9weXRob25cIilcbiAgICByZXR1cm4gZWRpdG9yO1xufVxuXG5mdW5jdGlvbiBtYWluKCk6IHZvaWQge1xuICAgIGNvbnN0IGVkaXRvciA9IHNldHVwRWRpdG9yKCk7XG4gICAgY29uc3QgZXhlY3V0ZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXhlY3V0ZVwiKVxuICAgIGV4ZWN1dGVCdG4/LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZTogRXZlbnQpOiB2b2lkID0+IHtcbiAgICAgICAgY29uc3QgY3VzdG9tQ29kZXMgPSBlZGl0b3IuZ2V0VmFsdWUoKVxuICAgICAgICBjb25zdCBmblZhbHVlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2ZuLXZhbHVlXCIpIGFzIEhUTUxJbnB1dEVsZW1lbnRcbiAgICAgICAgaWYgKGZuVmFsdWVJbnB1dCA9PSBudWxsKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImZuLXZhbHVlIGlucHV0IGRvZXMgbm90IGV4aXN0XCIpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBleGVjdXRlKGN1c3RvbUNvZGVzLCBmblZhbHVlSW5wdXQudmFsdWUpLnRoZW4oKVxuICAgIH0pXG59XG5cbmV4cG9ydCB7bWFpbn07IiwiLyogKGlnbm9yZWQpICovIiwiLyogKGlnbm9yZWQpICovIiwiLyogKGlnbm9yZWQpICovIiwiLyogKGlnbm9yZWQpICovIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9