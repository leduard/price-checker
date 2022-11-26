import React, { useState, useEffect } from "react";

import NotAvailableWebsite from "@views/NotAvailableWebsite";
import Home from "@views/Home";

const Router: React.FC = () => {
    const [currentUrl, setCurrentUrl] = useState<string>();
    const [isAnAvailableSite, setIsAnAvailableSite] = useState(false);

    useEffect(() => {
        chrome.runtime.sendMessage<FunctionsName>(
            { requestName: "getPageSource" },
            setCurrentUrl
        );
    }, []);

    return isAnAvailableSite ? <Home /> : <NotAvailableWebsite />;
};

export default Router;
