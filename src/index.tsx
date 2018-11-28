import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

function run() {
    ReactDOM.render(
        <App />,
        document.getElementById('root') as HTMLElement
    );
    registerServiceWorker();
}

const loadedStates = ['complete', 'loaded', 'interactive'];

if (loadedStates.indexOf(document.readyState) != -1 && document.body) {
    run();
} else {
    window.addEventListener('DOMContentLoaded', run, false);
}


