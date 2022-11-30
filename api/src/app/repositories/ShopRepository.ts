import dataSource from "dataSource";

import Shop from "@models/Shop";

interface ShopRepository {
    offset: string;
    shopName: string;
    shopHostname?: string;
}

export const UserRepository = dataSource.getRepository(Shop).extend({
    all(params: { offset: string }) {
        const { offset = "0" } = params;

        const shopsQuery = this.createQueryBuilder("shop")
            .where("shop.isActive = :isActive", { isActive: true })
            .skip(Number(offset))
            .getMany();

        return shopsQuery;
    },
    findByHostname(hostname: string) {
        const shopQuery = this.createQueryBuilder("shop")
            .where("shop.hostname = :hostname", { hostname })
            .getOne();

        return shopQuery;
    },
});

export default UserRepository;
