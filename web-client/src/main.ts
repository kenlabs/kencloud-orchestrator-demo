import axios from "axios"
import {create as IpfsHttpClient} from 'ipfs-http-client'
import * as ace from 'ace-builds';
import 'ace-builds/webpack-resolver';


const FILE_LIMIT_MB = 1.5;
const FILE_LIMIT_BYTES = FILE_LIMIT_MB * 1024 * 1024;
const CLIENT_ID = "client1";
const IPFS_API = "/ip4/52.14.211.248/tcp/5001";

async function getExecutor(): Promise<any> {
    const GET_URL = `http://localhost:8769/execute?client=${CLIENT_ID}`;

    try {
        const response = await axios.get(GET_URL, {
            headers: {'Access-Control-Allow-Origin': '*'}
        });
        return response.data
    } catch (exception) {
        console.log(`ERROR received from ${GET_URL}: ${exception}`);
    }
}

async function execute(code: String, value: String): Promise<void> {
    let executorInfo = await getExecutor()
    let requestTopic = executorInfo.message.RequestTopic
    let responseTopic = executorInfo.message.ResponseTopic
    console.log(`fetch executor topics: \n request=${requestTopic}\n response=${responseTopic}`)

    // @ts-ignore
    const ipfs = IpfsHttpClient(IPFS_API);
    let msg = {
        'arg': value,
        'code': code
    }
    let str = JSON.stringify(msg)
    let data = new Uint8Array(str.length)
    for (let i = 0; i < str.length; i++) {
        data[i] = str.charCodeAt(i);
    }
    await ipfs.pubsub.publish(requestTopic, data)
    await ipfs.pubsub.subscribe(responseTopic, msg => {
        console.log(`result reached:\n ${msg}`)
        const resultElem = document.querySelector("#result") as HTMLPreElement
        resultElem.innerHTML = msg.data.toString()
    })
}

function setupEditor(): ace.Ace.Editor {
    const editor = ace.edit("editor", {
        mode: "ace/mode/html",
        theme: "ace/theme/dracula",
        maxLines: 30,
        minLines: 20,
        fontSize: 14,
    });
    editor.session.setMode("ace/mode/python")
    return editor;
}

function main(): void {
    const editor = setupEditor();
    const executeBtn = document.querySelector("#execute")
    executeBtn?.addEventListener("click", (e: Event): void => {
        const customCodes = editor.getValue()
        const fnValueInput = document.querySelector("#fn-value") as HTMLInputElement
        if (fnValueInput == null) {
            console.log("fn-value input does not exist")
            return
        }
        execute(customCodes, fnValueInput.value).then()
    })
}

export {main};