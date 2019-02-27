import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {Route} from "react-router";
import {BrowserRouter} from "react-router-dom";
import Coordinates from "./Coordinates";
import Ligands from "./Ligands";
// import App from "./App";


function run() {
    ReactDOM.render(
        <BrowserRouter>
            <div>
                <Route exact path="/" component={Coordinates}/>
                <Route path="/coordinates" component={Coordinates}/>
                <Route path="/ligands" component={Ligands}/>
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


