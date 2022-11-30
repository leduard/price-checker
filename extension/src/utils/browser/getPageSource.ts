export default function getPageSource(): Promise<string> {
    const pageSource: Promise<string> = new Promise((resolve) => {
        chrome.tabs.executeScript(
            { code: "document.documentElement.innerHTML" },
            (result) => {
                if (chrome.runtime.lastError?.message) {
                    console.error(chrome.runtime.lastError?.message);
                }

                const pageSource: string = result.find(Boolean);
                resolve(pageSource);
            }
        );
    });

    return pageSource;
}
