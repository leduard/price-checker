import exposedFunctions from "../exposedFunctions";

interface BackgroundMessage {
    requestName: string;
}

export default function onRuntimeMessage(
    request: BackgroundMessage,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response: any) => void
): boolean {
    // onMessage must return "true" if response is async.
    let isResponseAsync = false;

    if (!!request.requestName) {
        const executeFunction = exposedFunctions.find(
            (func) => func.name === request.requestName
        );

        if (!!executeFunction) {
            return executeFunction.execute(sendResponse);
        }

        console.warn(
            `Function ${request.requestName} not found, check src/backgroundService/exposedFunctions.ts`
        );
    }

    return isResponseAsync;
}
