import {
    getShopFromUrl,
    checkHost,
    checkPath,
} from "@shared/utils/availableShops";
import getPageSource from "@utils/browser/getPageSource";

const doubleStatus = ["amazon"];

export default async function onTabUpdated(
    tabId: number,
    changeInfo: chrome.tabs.TabChangeInfo,
    tab: chrome.tabs.Tab
): Promise<void> {
    // Only run on the current opened tab and if the host & path
    // matches a available shop from the list
    if (tab?.active && checkHost(tab.url) && checkPath(tab.url)) {
        const { hostname } = new URL(tab.url);

        if (changeInfo?.status === "complete") {
            // Some sites sends 2 events with status "complete" and only one of them
            // have the changeInfo url property set. It is used to run the extraction
            // only one time.
            const hasDoubleStatus = doubleStatus.find((shop) =>
                hostname.includes(shop)
            );
            if (hasDoubleStatus) {
                if (changeInfo?.url) {
                    extractData(tab.url);
                }
            } else {
                extractData(tab.url);
            }
        }
    }
}

async function extractData(url: string): Promise<void> {
    const shop = getShopFromUrl(url);
    const pageSource = await getPageSource();

    const ExtractorClass = shop.Extractor;
    const Extractor = new ExtractorClass(shop.name, url);

    try {
        // Types for "crawlData" does not matter here
        // it only matters inside the specifics Extractor's classes
        const crawlData = await Extractor.crawl(pageSource);
        const products = await Extractor.scrape(crawlData);

        console.log(products);
    } catch (error) {
        console.error(
            `Caught error while crawling shop "${shop.name}".`,
            error
        );
    }
}
