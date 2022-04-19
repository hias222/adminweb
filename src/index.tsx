import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './admin/App';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter } from 'react-router-dom';
import Settings from './settings/Settings';
import State from './state/State';
import Message from './message/Message';
import Result from './result/Result';
import Combined from './combined/Combined';

const routing = (
    <BrowserRouter basename="/admin">
        <Route path="/" exact component={App} />
        <Route path="/Settings" component={Settings} />
        <Route path="/State" component={State} />
        <Route path="/Message" component={Message} />
        <Route path="/Admin" component={App} />
        <Route path="/Resultdata" component={Result} />
        <Route path="/Combined" component={Combined} />
    </BrowserRouter>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
