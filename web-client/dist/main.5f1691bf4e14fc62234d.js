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
        'code': encodeURIComponent(window.btoa(code))
    };
    let str = JSON.stringify(msg);
    let data = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++) {
        data[i] = str.charCodeAt(i);
    }
    await ipfs.pubsub.publish(requestTopic, data);
    await ipfs.pubsub.subscribe(responseTopic, msg => {
        console.log(`result reached:\n ${msg}`);
        const resultElem = document.querySelector("#result");
        resultElem.innerHTML = new TextDecoder().decode(msg.data);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RSxFQUFFO1FBQ1osUUFBUSxFQUFFLEVBQUU7S0FDZixDQUFDLENBQUM7SUFDSCxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztJQUN6QyxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBRUQsU0FBUyxJQUFJO0lBQ1QsTUFBTSxNQUFNLEdBQUcsV0FBVyxFQUFFLENBQUM7SUFDN0IsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUM7SUFDckQsVUFBVSxFQUFFLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQVEsRUFBUSxFQUFFO1FBQ3JELE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUU7UUFDckMsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQXFCO1FBQzVFLElBQUksWUFBWSxJQUFJLElBQUksRUFBRTtZQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDO1lBQzVDLE9BQU07U0FDVDtRQUNELE9BQU8sQ0FBQyxXQUFXLEVBQUUsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBRTtJQUNuRCxDQUFDLENBQUM7QUFDTixDQUFDO0FBRU8sb0JBQUk7Ozs7Ozs7Ozs7O0FDM0VaOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY29tcHV0ZS1tZXNoLWNsaWVudC8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9jb21wdXRlLW1lc2gtY2xpZW50Ly4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vY29tcHV0ZS1tZXNoLWNsaWVudC9pZ25vcmVkfC9Vc2Vycy9iZW4vZm9yd29yay9rZW5sYWJzL2NvbXB1dGUtbWVzaC1jbGllbnQvbm9kZV9tb2R1bGVzL2lwZnMtaHR0cC1jbGllbnQvc3JjL2xpYnxodHRwIiwid2VicGFjazovL2NvbXB1dGUtbWVzaC1jbGllbnQvaWdub3JlZHwvVXNlcnMvYmVuL2Zvcndvcmsva2VubGFicy9jb21wdXRlLW1lc2gtY2xpZW50L25vZGVfbW9kdWxlcy9pcGZzLWh0dHAtY2xpZW50L3NyYy9saWJ8aHR0cHMiLCJ3ZWJwYWNrOi8vY29tcHV0ZS1tZXNoLWNsaWVudC9pZ25vcmVkfC9Vc2Vycy9iZW4vZm9yd29yay9rZW5sYWJzL2NvbXB1dGUtbWVzaC1jbGllbnQvbm9kZV9tb2R1bGVzL2lwZnMtaHR0cC1jbGllbnQvc3JjfGlwZnMtdXRpbHMvc3JjL2ZpbGVzL2dsb2Itc291cmNlIiwid2VicGFjazovL2NvbXB1dGUtbWVzaC1jbGllbnQvaWdub3JlZHwvVXNlcnMvYmVuL2Zvcndvcmsva2VubGFicy9jb21wdXRlLW1lc2gtY2xpZW50L25vZGVfbW9kdWxlcy9pcGZzLXV0aWxzL3NyY3xlbGVjdHJvbi1mZXRjaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge21haW59IGZyb20gJy4vbWFpbic7XG5cbndpbmRvdy5vbmxvYWQgPSBtYWluOyIsImltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIlxuaW1wb3J0IHtjcmVhdGUgYXMgSXBmc0h0dHBDbGllbnR9IGZyb20gJ2lwZnMtaHR0cC1jbGllbnQnXG5pbXBvcnQgKiBhcyBhY2UgZnJvbSAnYWNlLWJ1aWxkcyc7XG5pbXBvcnQgJ2FjZS1idWlsZHMvd2VicGFjay1yZXNvbHZlcic7XG5cblxuY29uc3QgRklMRV9MSU1JVF9NQiA9IDEuNTtcbmNvbnN0IEZJTEVfTElNSVRfQllURVMgPSBGSUxFX0xJTUlUX01CICogMTAyNCAqIDEwMjQ7XG5jb25zdCBDTElFTlRfSUQgPSBcImNsaWVudDFcIjtcbmNvbnN0IElQRlNfQVBJID0gXCIvaXA0LzUyLjE0LjIxMS4yNDgvdGNwLzUwMDFcIjtcblxuYXN5bmMgZnVuY3Rpb24gZ2V0RXhlY3V0b3IoKTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCBHRVRfVVJMID0gYGh0dHA6Ly9sb2NhbGhvc3Q6ODc2OS9leGVjdXRlP2NsaWVudD0ke0NMSUVOVF9JRH1gO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5nZXQoR0VUX1VSTCwge1xuICAgICAgICAgICAgaGVhZGVyczogeydBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiAnKid9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YVxuICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgICBjb25zb2xlLmxvZyhgRVJST1IgcmVjZWl2ZWQgZnJvbSAke0dFVF9VUkx9OiAke2V4Y2VwdGlvbn1gKTtcbiAgICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGV4ZWN1dGUoY29kZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbGV0IGV4ZWN1dG9ySW5mbyA9IGF3YWl0IGdldEV4ZWN1dG9yKClcbiAgICBsZXQgcmVxdWVzdFRvcGljID0gZXhlY3V0b3JJbmZvLm1lc3NhZ2UuUmVxdWVzdFRvcGljXG4gICAgbGV0IHJlc3BvbnNlVG9waWMgPSBleGVjdXRvckluZm8ubWVzc2FnZS5SZXNwb25zZVRvcGljXG4gICAgY29uc29sZS5sb2coYGZldGNoIGV4ZWN1dG9yIHRvcGljczogXFxuIHJlcXVlc3Q9JHtyZXF1ZXN0VG9waWN9XFxuIHJlc3BvbnNlPSR7cmVzcG9uc2VUb3BpY31gKVxuXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNvbnN0IGlwZnMgPSBJcGZzSHR0cENsaWVudChJUEZTX0FQSSk7XG4gICAgbGV0IG1zZyA9IHtcbiAgICAgICAgJ2FyZyc6IHZhbHVlLFxuICAgICAgICAnY29kZSc6IGVuY29kZVVSSUNvbXBvbmVudCh3aW5kb3cuYnRvYShjb2RlKSlcbiAgICB9XG4gICAgbGV0IHN0ciA9IEpTT04uc3RyaW5naWZ5KG1zZylcbiAgICBsZXQgZGF0YSA9IG5ldyBVaW50OEFycmF5KHN0ci5sZW5ndGgpXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZGF0YVtpXSA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgIH1cbiAgICBhd2FpdCBpcGZzLnB1YnN1Yi5wdWJsaXNoKHJlcXVlc3RUb3BpYywgZGF0YSlcbiAgICBhd2FpdCBpcGZzLnB1YnN1Yi5zdWJzY3JpYmUocmVzcG9uc2VUb3BpYywgbXNnID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coYHJlc3VsdCByZWFjaGVkOlxcbiAke21zZ31gKVxuICAgICAgICBjb25zdCByZXN1bHRFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZXN1bHRcIikgYXMgSFRNTFByZUVsZW1lbnRcbiAgICAgICAgcmVzdWx0RWxlbS5pbm5lckhUTUwgPSBuZXcgVGV4dERlY29kZXIoKS5kZWNvZGUobXNnLmRhdGEpXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gc2V0dXBFZGl0b3IoKTogYWNlLkFjZS5FZGl0b3Ige1xuICAgIGNvbnN0IGVkaXRvciA9IGFjZS5lZGl0KFwiZWRpdG9yXCIsIHtcbiAgICAgICAgbW9kZTogXCJhY2UvbW9kZS9odG1sXCIsXG4gICAgICAgIHRoZW1lOiBcImFjZS90aGVtZS9kcmFjdWxhXCIsXG4gICAgICAgIG1heExpbmVzOiAzMCxcbiAgICAgICAgbWluTGluZXM6IDIwLFxuICAgICAgICBmb250U2l6ZTogMTQsXG4gICAgfSk7XG4gICAgZWRpdG9yLnNlc3Npb24uc2V0TW9kZShcImFjZS9tb2RlL3B5dGhvblwiKVxuICAgIHJldHVybiBlZGl0b3I7XG59XG5cbmZ1bmN0aW9uIG1haW4oKTogdm9pZCB7XG4gICAgY29uc3QgZWRpdG9yID0gc2V0dXBFZGl0b3IoKTtcbiAgICBjb25zdCBleGVjdXRlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNleGVjdXRlXCIpXG4gICAgZXhlY3V0ZUJ0bj8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlOiBFdmVudCk6IHZvaWQgPT4ge1xuICAgICAgICBjb25zdCBjdXN0b21Db2RlcyA9IGVkaXRvci5nZXRWYWx1ZSgpXG4gICAgICAgIGNvbnN0IGZuVmFsdWVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm4tdmFsdWVcIikgYXMgSFRNTElucHV0RWxlbWVudFxuICAgICAgICBpZiAoZm5WYWx1ZUlucHV0ID09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZm4tdmFsdWUgaW5wdXQgZG9lcyBub3QgZXhpc3RcIilcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGV4ZWN1dGUoY3VzdG9tQ29kZXMsIGZuVmFsdWVJbnB1dC52YWx1ZSkudGhlbigpXG4gICAgfSlcbn1cblxuZXhwb3J0IHttYWlufTsiLCIvKiAoaWdub3JlZCkgKi8iLCIvKiAoaWdub3JlZCkgKi8iLCIvKiAoaWdub3JlZCkgKi8iLCIvKiAoaWdub3JlZCkgKi8iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=