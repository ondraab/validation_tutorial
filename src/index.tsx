import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {Route} from "react-router";
import {BrowserRouter} from "react-router-dom";
import Theory from "./Theory";
import Introduction from "./Introduction";
import Example1 from "./Example1";
import Example2 from "./Example2";
import Example3 from "./Example3";
import Interactive from "./Interactive";

function run() {
    ReactDOM.render(
        <BrowserRouter>
            <div>
                <Route exact path="/" component={Introduction}/>
                <Route path="/coordinates" component={Theory}/>
                <Route path="/example1" component={Example1}/>
                <Route path="/example2" component={Example2}/>
                <Route path="/example3" component={Example3}/>
                <Route path={"/interactive"} component={Interactive}/>
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


