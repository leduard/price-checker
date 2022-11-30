import onTabUpdated from "./onTabUpdated";
import onRuntimeMessage from "./onRuntimeMessage";

interface Listeners {
    [listenerName: string]: {
        create: () => void;
        remove: () => void;
    };
}

const listeners: Listeners = {
    onTabUpdated: {
        create: () => chrome.tabs.onUpdated.addListener(onTabUpdated),
        remove: () => chrome.tabs.onUpdated.removeListener(onTabUpdated),
    },
    onRuntimeMessage: {
        create: () => chrome.runtime.onMessage.addListener(onRuntimeMessage),
        remove: () => chrome.runtime.onMessage.removeListener(onRuntimeMessage),
    },
};

export default listeners;
