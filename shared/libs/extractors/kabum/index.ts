import currency from "currency.js";
import Extractor from "../Extractor";

export default class KabumExtractor extends Extractor<CrawlJSONType> {
    async crawl(pageSource: string): Promise<CrawlJSONType> {
        const $ = this.loadPageSource(pageSource);

        const data: CrawlJSONType = JSON.parse(
            $("#__NEXT_DATA__")?.contents()?.toString()
        );

        if (!data) {
            throw new Error(
                "NEXT_DATA script not found or does not have content"
            );
        }

        return data;
    }

    async scrape(dataSource: CrawlJSONType): Promise<ProductData> {
        let data = dataSource.props?.pageProps?.data.productData;

        if (data && typeof data === "string") {
            const parsedData = JSON.parse(data);

            const available = this.parseAvailable(parsedData);
            const priceInCash = this.parsePriceInCash(parsedData);
            const price = this.parsePrice(parsedData);
            const promo = this.parsePromo(parsedData);
            const images = this.parseImages(parsedData);

            return {
                available,
                priceInfo: {
                    cash: priceInCash,
                    credit: price,
                },
                promo,
                images,
                currency: "BRL",
            } as ProductData;
        }

        throw new Error(
            "Could not find viable data from dataSource (props.pageProps.data)"
        );
    }

    private parseAvailable(data: CrawlJSONType): boolean {
        return !!data.available;
    }

    parsePriceInCash(data: CrawlJSONType): number {
        const priceDetails = data.priceDetails;

        return priceDetails.discountPrice;
    }

    parsePrice(data: { [key: string]: any }): number {
        const priceDetails = data.priceDetails;

        return priceDetails.price;
    }

    parsePromo(data: { [key: string]: any }): boolean {
        return data.offer.offerDiscount > 0;
    }

    parseImages(data: { [key: string]: any }): string[] {
        return data.photos;
    }
}
