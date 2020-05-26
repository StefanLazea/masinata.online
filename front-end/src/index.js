import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker.js';

import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();
