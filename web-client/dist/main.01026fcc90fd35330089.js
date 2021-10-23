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
        'code': encodeURIComponent(window.btoa(code + '\n\n\n\n'))
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
    // set client id
    const clientIdElem = document.querySelector("#client-id");
    clientIdElem.innerHTML = CLIENT_ID;
    // create code editor
    const editor = setupEditor();
    // code execution
    const executeBtn = document.querySelector("#execute");
    executeBtn?.addEventListener("click", (e) => {
        const customCodes = editor.getValue();
        const fnValueInput = document.querySelector("#fn-value");
        if (fnValueInput == null) {
            console.log("fn-value input does not exist");
            return;
        }
        execute(customCodes, fnValueInput.value).then(() => console.log("execute complete."));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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WixRQUFRLEVBQUUsRUFBRTtRQUNaLFFBQVEsRUFBRSxFQUFFO0tBQ2YsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUM7SUFDekMsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQUVELFNBQVMsSUFBSTtJQUNULGdCQUFnQjtJQUNoQixNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBbUI7SUFDM0UsWUFBWSxDQUFDLFNBQVMsR0FBRyxTQUFTO0lBRWxDLHFCQUFxQjtJQUNyQixNQUFNLE1BQU0sR0FBRyxXQUFXLEVBQUUsQ0FBQztJQUU3QixpQkFBaUI7SUFDakIsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUM7SUFDckQsVUFBVSxFQUFFLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQVEsRUFBUSxFQUFFO1FBQ3JELE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUU7UUFDckMsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQXFCO1FBQzVFLElBQUksWUFBWSxJQUFJLElBQUksRUFBRTtZQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDO1lBQzVDLE9BQU07U0FDVDtRQUNELE9BQU8sQ0FBQyxXQUFXLEVBQUUsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFFLEVBQUUsUUFBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ3ZGLENBQUMsQ0FBQztBQUNOLENBQUM7QUFFTyxvQkFBSTs7Ozs7Ozs7Ozs7QUNsRlo7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb21wdXRlLW1lc2gtY2xpZW50Ly4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL2NvbXB1dGUtbWVzaC1jbGllbnQvLi9zcmMvbWFpbi50cyIsIndlYnBhY2s6Ly9jb21wdXRlLW1lc2gtY2xpZW50L2lnbm9yZWR8L1VzZXJzL2Jlbi9mb3J3b3JrL2tlbmxhYnMvY29tcHV0ZS1tZXNoLWNsaWVudC9ub2RlX21vZHVsZXMvaXBmcy1odHRwLWNsaWVudC9zcmMvbGlifGh0dHAiLCJ3ZWJwYWNrOi8vY29tcHV0ZS1tZXNoLWNsaWVudC9pZ25vcmVkfC9Vc2Vycy9iZW4vZm9yd29yay9rZW5sYWJzL2NvbXB1dGUtbWVzaC1jbGllbnQvbm9kZV9tb2R1bGVzL2lwZnMtaHR0cC1jbGllbnQvc3JjL2xpYnxodHRwcyIsIndlYnBhY2s6Ly9jb21wdXRlLW1lc2gtY2xpZW50L2lnbm9yZWR8L1VzZXJzL2Jlbi9mb3J3b3JrL2tlbmxhYnMvY29tcHV0ZS1tZXNoLWNsaWVudC9ub2RlX21vZHVsZXMvaXBmcy1odHRwLWNsaWVudC9zcmN8aXBmcy11dGlscy9zcmMvZmlsZXMvZ2xvYi1zb3VyY2UiLCJ3ZWJwYWNrOi8vY29tcHV0ZS1tZXNoLWNsaWVudC9pZ25vcmVkfC9Vc2Vycy9iZW4vZm9yd29yay9rZW5sYWJzL2NvbXB1dGUtbWVzaC1jbGllbnQvbm9kZV9tb2R1bGVzL2lwZnMtdXRpbHMvc3JjfGVsZWN0cm9uLWZldGNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7bWFpbn0gZnJvbSAnLi9tYWluJztcblxud2luZG93Lm9ubG9hZCA9IG1haW47IiwiaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiXG5pbXBvcnQge2NyZWF0ZSBhcyBJcGZzSHR0cENsaWVudH0gZnJvbSAnaXBmcy1odHRwLWNsaWVudCdcbmltcG9ydCAqIGFzIGFjZSBmcm9tICdhY2UtYnVpbGRzJztcbmltcG9ydCAnYWNlLWJ1aWxkcy93ZWJwYWNrLXJlc29sdmVyJztcblxuXG5jb25zdCBGSUxFX0xJTUlUX01CID0gMS41O1xuY29uc3QgRklMRV9MSU1JVF9CWVRFUyA9IEZJTEVfTElNSVRfTUIgKiAxMDI0ICogMTAyNDtcbmNvbnN0IENMSUVOVF9JRCA9IFwiY2xpZW50MVwiO1xuY29uc3QgSVBGU19BUEkgPSBcIi9pcDQvNTIuMTQuMjExLjI0OC90Y3AvNTAwMVwiO1xuXG5hc3luYyBmdW5jdGlvbiBnZXRFeGVjdXRvcigpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IEdFVF9VUkwgPSBgaHR0cDovL2xvY2FsaG9zdDo4NzY5L2V4ZWN1dGU/Y2xpZW50PSR7Q0xJRU5UX0lEfWA7XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zLmdldChHRVRfVVJMLCB7XG4gICAgICAgICAgICBoZWFkZXJzOiB7J0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJ31cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhXG4gICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBFUlJPUiByZWNlaXZlZCBmcm9tICR7R0VUX1VSTH06ICR7ZXhjZXB0aW9ufWApO1xuICAgIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZShjb2RlOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsZXQgZXhlY3V0b3JJbmZvID0gYXdhaXQgZ2V0RXhlY3V0b3IoKVxuICAgIGxldCByZXF1ZXN0VG9waWMgPSBleGVjdXRvckluZm8ubWVzc2FnZS5SZXF1ZXN0VG9waWNcbiAgICBsZXQgcmVzcG9uc2VUb3BpYyA9IGV4ZWN1dG9ySW5mby5tZXNzYWdlLlJlc3BvbnNlVG9waWNcbiAgICBjb25zb2xlLmxvZyhgZmV0Y2ggZXhlY3V0b3IgdG9waWNzOiBcXG4gcmVxdWVzdD0ke3JlcXVlc3RUb3BpY31cXG4gcmVzcG9uc2U9JHtyZXNwb25zZVRvcGljfWApXG5cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3QgaXBmcyA9IElwZnNIdHRwQ2xpZW50KElQRlNfQVBJKTtcbiAgICBsZXQgbXNnID0ge1xuICAgICAgICAnYXJnJzogdmFsdWUsXG4gICAgICAgICdjb2RlJzogZW5jb2RlVVJJQ29tcG9uZW50KHdpbmRvdy5idG9hKGNvZGUrJ1xcblxcblxcblxcbicpKVxuICAgIH1cbiAgICBsZXQgc3RyID0gSlNPTi5zdHJpbmdpZnkobXNnKVxuICAgIGxldCBkYXRhID0gbmV3IFVpbnQ4QXJyYXkoc3RyLmxlbmd0aClcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgICAgICBkYXRhW2ldID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgfVxuICAgIGF3YWl0IGlwZnMucHVic3ViLnB1Ymxpc2gocmVxdWVzdFRvcGljLCBkYXRhKVxuICAgIGF3YWl0IGlwZnMucHVic3ViLnN1YnNjcmliZShyZXNwb25zZVRvcGljLCBtc2cgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhgcmVzdWx0IHJlYWNoZWQ6XFxuICR7bXNnfWApXG4gICAgICAgIGNvbnN0IHJlc3VsdEVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Jlc3VsdFwiKSBhcyBIVE1MUHJlRWxlbWVudFxuICAgICAgICByZXN1bHRFbGVtLmlubmVySFRNTCA9IG5ldyBUZXh0RGVjb2RlcigpLmRlY29kZShtc2cuZGF0YSlcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBzZXR1cEVkaXRvcigpOiBhY2UuQWNlLkVkaXRvciB7XG4gICAgY29uc3QgZWRpdG9yID0gYWNlLmVkaXQoXCJlZGl0b3JcIiwge1xuICAgICAgICBtb2RlOiBcImFjZS9tb2RlL2h0bWxcIixcbiAgICAgICAgdGhlbWU6IFwiYWNlL3RoZW1lL2RyYWN1bGFcIixcbiAgICAgICAgbWF4TGluZXM6IDMwLFxuICAgICAgICBtaW5MaW5lczogMjAsXG4gICAgICAgIGZvbnRTaXplOiAxNCxcbiAgICB9KTtcbiAgICBlZGl0b3Iuc2Vzc2lvbi5zZXRNb2RlKFwiYWNlL21vZGUvcHl0aG9uXCIpXG4gICAgcmV0dXJuIGVkaXRvcjtcbn1cblxuZnVuY3Rpb24gbWFpbigpOiB2b2lkIHtcbiAgICAvLyBzZXQgY2xpZW50IGlkXG4gICAgY29uc3QgY2xpZW50SWRFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjbGllbnQtaWRcIikgYXMgSFRNTFByZUVsZW1lbnRcbiAgICBjbGllbnRJZEVsZW0uaW5uZXJIVE1MID0gQ0xJRU5UX0lEXG5cbiAgICAvLyBjcmVhdGUgY29kZSBlZGl0b3JcbiAgICBjb25zdCBlZGl0b3IgPSBzZXR1cEVkaXRvcigpO1xuXG4gICAgLy8gY29kZSBleGVjdXRpb25cbiAgICBjb25zdCBleGVjdXRlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNleGVjdXRlXCIpXG4gICAgZXhlY3V0ZUJ0bj8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlOiBFdmVudCk6IHZvaWQgPT4ge1xuICAgICAgICBjb25zdCBjdXN0b21Db2RlcyA9IGVkaXRvci5nZXRWYWx1ZSgpXG4gICAgICAgIGNvbnN0IGZuVmFsdWVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm4tdmFsdWVcIikgYXMgSFRNTElucHV0RWxlbWVudFxuICAgICAgICBpZiAoZm5WYWx1ZUlucHV0ID09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZm4tdmFsdWUgaW5wdXQgZG9lcyBub3QgZXhpc3RcIilcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGV4ZWN1dGUoY3VzdG9tQ29kZXMsIGZuVmFsdWVJbnB1dC52YWx1ZSkudGhlbigoKT0+Y29uc29sZS5sb2coXCJleGVjdXRlIGNvbXBsZXRlLlwiKSlcbiAgICB9KVxufVxuXG5leHBvcnQge21haW59OyIsIi8qIChpZ25vcmVkKSAqLyIsIi8qIChpZ25vcmVkKSAqLyIsIi8qIChpZ25vcmVkKSAqLyIsIi8qIChpZ25vcmVkKSAqLyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==