import Extractor from "@shared-libs/extractors/Extractor";

import AmazonExtractor from "@shared-libs/extractors/amazon";
import KabumExtractor from "@shared-libs/extractors/kabum";

declare type ConstructorFunction<T extends Extractor<any>> = new (
    ...args: ConstructorParameters<typeof Extractor>
) => T;

export interface AvailableShop {
    name: string;
    /**
     * Hostname on the format "www.host.com"
     */
    hostname: string;
    /**
     * List with all the url paths that should be checked
     */
    paths: RegExp[];
    Extractor: ConstructorFunction<Extractor<any>>;
}

const availableShops: AvailableShop[] = [
    {
        name: "Kabum",
        hostname: "www.kabum.com.br",
        paths: [new RegExp("/produto/\\d*/.*", "i")],
        Extractor: KabumExtractor,
    },
    {
        name: "Amazon",
        hostname: "www.amazon.com.br",
        paths: [new RegExp("/dp/.*", "i"), new RegExp("/gp/product/.*", "i")],
        Extractor: AmazonExtractor,
    },
];

export default availableShops;
