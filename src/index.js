import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { CookiesProvider } from 'react-cookie';

ReactDOM.render(
    <CookiesProvider>
        <App />
    </CookiesProvider>
, document.getElementById('root'));
serviceWorker.unregister();
