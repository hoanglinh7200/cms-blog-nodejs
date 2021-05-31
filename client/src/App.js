import React, { Component } from "react";
import './App.css';
import './main.js';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

import Dashboard from './Dashboard';
import User from './User';

export default class App extends Component {
    componentDidMount() {
        var script = document.createElement("script");
        script.async = true;
        script.src = "/dist/js/demo.js";
        document.getElementById('body').appendChild(script);
        var scriptCustom = document.createElement("script");
        scriptCustom.src = "/js/custom.js";
        document.getElementById('body').appendChild(scriptCustom);
    }

    render() {
        return (
            <Router>
                <div className="wrapper">
                    <Header />
                    <Sidebar />
                    <Switch>
                        <Route exact path="/dashboard">
                            <Dashboard />
                        </Route>
                        <Route exact path="/user">
                            <User />
                        </Route>
                    </Switch>
                    <Footer />
                    <aside className="control-sidebar control-sidebar-dark">
                    </aside>
                </div>
            </Router>
        );
    }
}
