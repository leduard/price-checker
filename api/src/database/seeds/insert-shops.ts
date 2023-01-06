import ShopRepository from "@repositories/ShopRepository";
import Shop from "@models/Shop";
import Validator from "@utils/validator";

const Shops: Partial<Shop>[] = [
    {
        id: "03b13ab2-d41c-41e0-8d8c-14e431d38fb5",
        name: "Kabum!",
        url: "https://kabum.com.br",
        hostname: "kabum.com.br",
        isActive: true,
    },
    {
        id: "008e16b3-1551-4975-91cc-225aaf406d71",
        name: "Pichau",
        url: "https://www.pichau.com.br",
        hostname: "pichau.com.br",
        isActive: true,
    },
];

export default async function insertShops(): Promise<void> {
    for (const shop of Shops) {
        const shopEntity = ShopRepository.create(shop);
        const errors = await Validator.validate(shopEntity);

        if (errors) {
            console.error(errors);
        }

        try {
            await ShopRepository.save(shopEntity);
        } catch (err: any) {
            console.error({
                message: `Could not insert shop ${shop.name}`,
                errorMessage: err.message,
                shop,
            });
        }
    }
}
