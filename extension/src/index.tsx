import * as React from "react";
import * as ReactDOM from "react-dom";
import Router from "./routes";

chrome.tabs.query({ active: true, currentWindow: true }, () => {
    ReactDOM.render(<Router />, document.getElementById("main"));
});
