import onTabUpdated from "./onTabUpdated";
import onRuntimeMessage from "./onRuntimeMessage";

interface Listener {
    [listenerName: string]: {
        create: () => void;
        remove: () => void;
    };
}

const listenersList: Listener = {
    onTabUpdated: {
        create: () => chrome.tabs.onUpdated.addListener(onTabUpdated),
        remove: () => chrome.tabs.onUpdated.removeListener(onTabUpdated),
    },
    onRuntimeMessage: {
        create: () => chrome.runtime.onMessage.addListener(onRuntimeMessage),
        remove: () => chrome.runtime.onMessage.removeListener(onRuntimeMessage),
    },
};

export default listenersList;
