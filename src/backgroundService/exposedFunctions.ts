const functionsNames = [
    /**
     * function that returns the page source
     */
    "getPageSource",
] as const;
export type FunctionsName = typeof functionsNames[number];

interface BackgroundFunctionRequest {
    name: FunctionsName;
    execute: (callback: (param: any) => void) => boolean;
}

const exposedFunctions: BackgroundFunctionRequest[] = [
    {
        name: "getPageSource",
        execute: (callback) => {
            const pageSource = new Promise((resolve) => {
                chrome.tabs.executeScript(
                    { code: "document.documentElement.innerHTML" },
                    (result) => {
                        resolve(result as unknown as string);
                    }
                );
            });

            callback(pageSource);
            return false;
        },
    },
];

export default exposedFunctions;
