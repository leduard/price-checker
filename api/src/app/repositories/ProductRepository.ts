import dataSource from "dataSource";

import Product from "@models/Product";

export const ProductRepository = dataSource.getRepository(Product).extend({
    all(params: { page: string }): Promise<[Product[], number]> {
        const { page: pageParam } = params;
        const page = parseInt(pageParam) || 1;
        const itemsPerPage = parseInt(process.env.API_ITEMS_PER_PAGE as string);

        const skip = page * itemsPerPage - itemsPerPage;

        const productsQuery = this.createQueryBuilder("product")
            .leftJoinAndSelect("product.shop", "shop")
            .skip(skip)
            .getManyAndCount();

        return productsQuery;
    },
    findByHostname(params: { page: string; hostname: string }) {
        const { page: pageParam, hostname } = params;
        const page = parseInt(pageParam) || 1;
        const itemsPerPage = parseInt(process.env.API_ITEMS_PER_PAGE as string);

        const skip = page * itemsPerPage - itemsPerPage;

        const shopQuery = this.createQueryBuilder("product")
            .leftJoinAndSelect("product.shop", "shop")
            .where("shop.hostname = :hostname", { hostname })
            .skip(skip)
            .getManyAndCount();

        return shopQuery;
    },
});

export default ProductRepository;
