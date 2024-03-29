import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './admin/App';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Settings from './settings/Settings';
import Display from './display/Display';
import Result from './result/Result';
import Combined from './combined/Combined';
import Message from './message/Message';
import Hiit from './hiit/Hiit';

const routing = (
    <BrowserRouter basename="/admin">
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/Settings" element={<Settings />} />
            <Route path="/Display" element={<Display />} />
            <Route path="/Message" element={<Message />} />
            <Route path="/Admin" element={<App />} />
            <Route path="/Resultdata" element={<Result />} />
            <Route path="/Combined" element={<Combined />} />
            <Route path="/Hiit" element={<Hiit />} />
        </Routes>
    </BrowserRouter>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
