import availableHosts from "./list";

function hostChecker(url: string): boolean {
    const hostname = new URL(url);

    if (
        hostname.hostname &&
        availableHosts.some((host) => host.hostname.includes(hostname.hostname))
    ) {
        return true;
    }

    return false;
}

export default hostChecker;
