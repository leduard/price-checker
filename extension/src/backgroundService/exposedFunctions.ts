import getPageSource from "@utils/browser/getPageSource";

export const functionsNames = [
    /**
     * function that returns the page source
     */
    "getPageSource",
] as const;

interface BackgroundFunctionRequest {
    name: FunctionsName;
    /** The return must be "true" if response is async */
    execute: (callback: (param: any) => void) => boolean;
}

const exposedFunctions: BackgroundFunctionRequest[] = [
    {
        name: "getPageSource",
        execute: (callback) => {
            callback(getPageSource());
            return false;
        },
    },
];

export default exposedFunctions;
