import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Coordinates from "./Coordinates";
import Ligands from "./Ligands";
// import App from "./App";
function run() {
    ReactDOM.render(React.createElement(BrowserRouter, null,
        React.createElement("div", null,
            React.createElement(Route, { exact: true, path: "/", component: Coordinates }),
            React.createElement(Route, { path: "/coordinates", component: Coordinates }),
            React.createElement(Route, { path: "/ligands", component: Ligands }))), document.getElementById('root'));
    registerServiceWorker();
}
var loadedStates = ['complete', 'loaded', 'interactive'];
if (loadedStates.indexOf(document.readyState) != -1 && document.body) {
    run();
}
else {
    window.addEventListener('DOMContentLoaded', run, false);
}
//# sourceMappingURL=index.js.map