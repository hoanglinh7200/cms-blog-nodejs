import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    StaticRouter,
    Switch,
    Route 
} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Login from './Login';

ReactDOM.render(
    <React.StrictMode>
        <Router basename="/admin">
            <Switch>
                <StaticRouter exact path="/login">
                    <Login />
                </StaticRouter>
                <Router path="/">
                    <App />
                </Router>
            </Switch>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
