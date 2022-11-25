import React, { useState, useEffect } from "react";

import hostChecker from "@utils/availableHosts/hostChecker";
import NotAvailableWebsite from "@views/NotAvailableWebsite";
import Home from "@views/Home";
import { FunctionsName } from "../backgroundService/exposedFunctions";

const Router: React.FC = () => {
    const [currentUrl, setCurrentUrl] = useState<string>();
    const [isAnAvailableSite, setIsAnAvailableSite] = useState(false);

    useEffect(() => {
        // Example of how to send a message to eventPage.ts.
        chrome.runtime.sendMessage<FunctionsName>(
            { requestName: "getPageSource" },
            setCurrentUrl
        );
    }, []);

    useEffect(() => {
        console.log("changed");
        console.log(currentUrl);
    }, [currentUrl]);

    return isAnAvailableSite ? <Home /> : <NotAvailableWebsite />;
};

export default Router;
