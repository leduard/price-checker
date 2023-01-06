import "reflect-metadata";

import "..";

import insertShops from "./insert-shops";

async function main(): Promise<void> {
    // awaits for metadata to load
    await new Promise((r) => setTimeout(r, 1000));

    await insertShops();
}

main().then(console.log).catch(console.error);
