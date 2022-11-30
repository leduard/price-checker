import { CheerioAPI, load } from "cheerio";

export default abstract class Extractor<CrawlDataType> {
    declare shopName: string;
    declare url: string;
    declare shop: Shop;

    // TODO: Implement data validation logic
    declare dataValidator: any;

    /**
     * @param pageSource - The page source code in string format
     * @returns T with the needed information for the scraper to work.
     */
    abstract crawl(pageSource: string): Promise<CrawlDataType>;
    /**
     * @param dataSource - Data returned by the Crawl method.
     * @returns A ProductData object.
     */
    abstract scrape(dataSource: CrawlDataType): Promise<ProductData>;

    constructor(shopName: string, url: string) {
        this.shopName = shopName;
        this.url = url;
        this.shop = this.getShop();
    }

    loadPageSource(pageSource: string): CheerioAPI {
        return load(pageSource);
    }

    getShop(): Shop {
        const urlObj = new URL(this.url);

        const shop: Shop = {
            name: this.shopName,
            url: urlObj.origin,
            hostname: urlObj.hostname,
            active: true,
            id: "",
            logo: "",
        };

        return shop;
    }
}
