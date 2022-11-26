export default function getPageSource(): Promise<string> {
    const pageSource: Promise<string> = new Promise((resolve) => {
        chrome.tabs.executeScript(
            { code: "document.documentElement.innerHTML" },
            (result) => {
                const pageSource: string = result.find(Boolean);

                resolve(pageSource);
            }
        );
    });

    return pageSource;
}
