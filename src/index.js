import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './index.css';
import App from './Frontend/App';
import * as serviceWorker from './serviceWorker';
import { CookiesProvider } from 'react-cookie';
import BackOffice from './BackOffice/BackOffice';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/admin" component={BackOffice} />
            <Route path="/" render={() => <CookiesProvider> <App /> </CookiesProvider> } />
        </Switch>
    </BrowserRouter>
, document.getElementById('root'));
serviceWorker.unregister();
