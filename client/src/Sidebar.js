import React, { Component } from 'react';
import {
    // BrowserRouter as Router,
    // Switch,
    // Route,
    NavLink
} from "react-router-dom";


export default class Sidebar extends Component {

    constructor(props){
        super(props);
    }

    getNavLinkClass = (path, className = 'active') => {
        return window.location.pathname === path ? className : '';
    }

    render() {
        return (
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <a href="/" className="brand-link">
                    <img src="/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                    <span className="brand-text font-weight-light">AdminLTE 3</span>
                </a>
                <div className="sidebar">
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li className="nav-item">
                                <NavLink activeClassName="active" to="/" exact className="nav-link">
                                    <i className="nav-icon fas fa-tachometer-alt" />
                                    <p>
                                        Dashboard
                                    </p>
                                </NavLink >
                            </li>
                            <li className={'nav-item ' + this.getNavLinkClass('/user', 'menu-open')}>
                                <a href="#" className={'nav-link ' + this.getNavLinkClass('/user')}>
                                    <i className="nav-icon fas fa-users" />
                                    <p>
                                        Quản lý thành viên
                                        <i className="fas fa-angle-left right" />
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <NavLink activeClassName="active" to="/user" exact className="nav-link">
                                            <i className="fa fa-list-ol nav-icon" />
                                            <p>Danh sách thành viên</p>
                                        </NavLink >
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        );
    }
}
