import Listeners from "./listeners";

export class BackgroundService {
    async start(): Promise<void> {
        try {
            this.createListeners();
        } catch (err) {
            console.error(err);
            await this.stop("Error while trying to start background service");
        }
    }

    async stop(reason?: string): Promise<void> {
        if (reason) {
            console.log("Stopping background service: " + reason);
        }

        this.removeListeners();
    }

    private createListeners(): void {
        for (const [listenerName, listener] of Object.entries(Listeners)) {
            console.log(`Initializing listener: ${listenerName}`);
            listener.create();
        }
    }

    private removeListeners(): void {
        for (const [listenerName, listener] of Object.entries(Listeners)) {
            console.log(`Removing listeners: ${listenerName}`);
            listener.remove();
        }
    }
}

const backgroundService = new BackgroundService();
backgroundService
    .start()
    .then()
    .catch((err) => {
        console.error(err);
        backgroundService.stop(err);
    });
