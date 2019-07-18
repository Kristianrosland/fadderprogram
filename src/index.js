import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './index.css';
import App from './Frontend/App';
import * as serviceWorker from './serviceWorker';
import { CookiesProvider } from 'react-cookie';
import BackOffice from './BackOffice/BackOffice';
import Firebase from './Firestore';

const firestore = new Firebase();

ReactDOM.render(
    <Router basename={process.env.PUBLIC_URL}>
        <Switch>
            <Route exact path="/admin" component={() => <BackOffice firestore={firestore} />} />
            <Route path="/" render={() => <CookiesProvider> <App firestore={firestore}/> </CookiesProvider> } />
        </Switch>
    </Router>
, document.getElementById('root'));
serviceWorker.unregister();
