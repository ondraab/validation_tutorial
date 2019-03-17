import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {Route} from "react-router";
import {BrowserRouter} from "react-router-dom";
import Coordinates from "./Coordinates";
import App from "./App";
import Interactive from "./Interactive";

function run() {
    ReactDOM.render(
        <BrowserRouter>
            <div>
                <Route exact path="/" component={App}/>
                <Route path="/coordinates" component={Coordinates}/>
                <Route path="/interactive" component={Interactive}/>
            </div>
        </BrowserRouter>,
    document.getElementById('root') as HTMLElement);
    registerServiceWorker();
}

const loadedStates = ['complete', 'loaded', 'interactive'];

if (loadedStates.indexOf(document.readyState) != -1 && document.body) {
    run();
} else {
    window.addEventListener('DOMContentLoaded', run, false);
}


