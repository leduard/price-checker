import dataSource from "dataSource";

import Shop from "@models/Shop";

export const ShopRepository = dataSource.getRepository(Shop).extend({
    all(params: { page: string }): Promise<[Shop[], number]> {
        const { page: pageParam } = params;
        const page = parseInt(pageParam) || 1;
        const itemsPerPage = parseInt(process.env.API_ITEMS_PER_PAGE as string);

        const skip = page * itemsPerPage - itemsPerPage;

        const shopsQuery = this.createQueryBuilder("shop")
            .where("shop.isActive = :isActive", { isActive: true })
            .skip(skip)
            .getManyAndCount();

        return shopsQuery;
    },
    findByHostname(hostname: string) {
        const shopQuery = this.createQueryBuilder("shop")
            .where("shop.hostname = :hostname", { hostname })
            .getOne();

        return shopQuery;
    },
});

export default ShopRepository;
