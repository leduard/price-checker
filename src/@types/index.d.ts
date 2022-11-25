declare namespace chrome.runtime {
    export function sendMessage<T>(
        message: { requestName: T },
        options?: MessageOptions,
        responseCallback?: (response: any) => void
    ): boolean;

    export function sendMessage<T>(
        message: { requestName: T },
        responseCallback?: (response: any) => void
    ): boolean;
}
