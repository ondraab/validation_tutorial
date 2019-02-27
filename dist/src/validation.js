import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ValApp from './ValApp';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
function run() {
    ReactDOM.render(React.createElement(ValApp, null), document.getElementById('root'));
    registerServiceWorker();
}
var loadedStates = ['complete', 'loaded', 'interactive'];
if (loadedStates.indexOf(document.readyState) != -1 && document.body) {
    run();
}
else {
    window.addEventListener('DOMContentLoaded', run, false);
}
//# sourceMappingURL=validation.js.map