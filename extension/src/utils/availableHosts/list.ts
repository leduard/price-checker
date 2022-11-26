export interface AvailableHost {
    name: string;
    /**
     * Hostname on the format "www.host.com"
     */
    hostname: string;
    /**
     * List with all the url paths that should be checked
     */
    paths: RegExp[];
}

const availableHosts: AvailableHost[] = [
    {
        name: "Kabum",
        hostname: "www.kabum.com.br",
        paths: [new RegExp("/produto/\\d+/.*", "i")],
    },
    {
        name: "Amazon",
        hostname: "www.amazon.com.br",
        paths: [new RegExp("/dp/.*", "i"), new RegExp("/gp/product/.*", "i")],
    },
];

export default availableHosts;
