import availableShops, { AvailableShop } from "./list";

export function getShopFromUrl(url: string): AvailableShop {
    const urlObject = new URL(url);

    if (urlObject.hostname) {
        const shop = availableShops.find((host) =>
            host.hostname.includes(urlObject.hostname)
        );

        return shop;
    }

    return;
}

export function checkHost(url: string): boolean {
    const urlObject = new URL(url);

    if (
        urlObject.hostname &&
        availableShops.some((host) =>
            host.hostname.includes(urlObject.hostname)
        )
    ) {
        return true;
    }

    return false;
}

export function checkPath(url: string): boolean {
    const urlObject = new URL(url);

    if (urlObject.pathname) {
        const shop = getShopFromUrl(url);

        if (shop.paths?.length) {
            return shop.paths.some((path) => path.test(urlObject.pathname));
        }

        return false;
    }

    return false;
}
