import { Route, Switch } from "react-router";
import * as React from "react";
import Ligands from "./Ligands";
import Coordinates from "./Coordinates";
var Main = function () { return (React.createElement("main", null,
    React.createElement(Switch, null,
        React.createElement(Route, { exact: true, path: '/', component: ValApp }),
        React.createElement(Route, { path: '/coordinates', component: Coordinates }),
        React.createElement(Route, { path: '/ligands', component: Ligands })))); };
//# sourceMappingURL=Main.js.map