import Extractor from "../Extractor";

export default class AmazonExtractor extends Extractor<CheerioAPI> {
    crawl<T>(pageSource: string): Promise<T> {
        throw new Error("Method not implemented.");
    }

    scrape<T>(dataSource: T): Promise<ProductData> {
        throw new Error("Method not implemented.");
    }
}
