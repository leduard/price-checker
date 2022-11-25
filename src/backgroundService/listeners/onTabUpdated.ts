export default function onTabUpdated(
    tabId: number,
    changeInfo: chrome.tabs.TabChangeInfo,
    tab: chrome.tabs.Tab
): void {
    // read changeInfo data and do something with it (like read the url)
    if (changeInfo?.url && tab?.active) {
        console.log(tab);
        console.log(changeInfo);
        // do something here
    }
}
