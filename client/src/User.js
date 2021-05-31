import React, { Component } from "react";
import axios from "axios";

import ButtonHelper from "./helpers/ButtonHelper";

export default class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            items: [],
        }
    }

    componentDidMount() {
        axios
            .get('http://service-nodejs.test/api/user')
            .then((response) => {
                this.setState({
                    error: false,
                    items: response.data.data
                });
            })
            .catch((e) => {
                this.setState({
                    error: e.message,
                });
            });
    }

    render() {
        let { error, items } = this.state;

        if (error) {
            return (
                <div className="content-wrapper">
                    {error}
                </div>
            );
        } else {
            return (
                <div className="content-wrapper">
                    <section className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1>Quản trị viên</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active">Quản trị viên</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h3 className="card-title">Danh sách quản trị viên</h3>
                                        </div>
                                        <div className="card-body">
                                            <table id="example1" className="table table-bordered table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>Tên</th>
                                                        <th>Email</th>
                                                        <th>Phone</th>
                                                        <th className="text-center">Thao tác</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {items.map(item => (
                                                        <tr>
                                                            <td>{item.name ?? ''}</td>
                                                            <td>{item.email ?? ''}</td>
                                                            <td>{item.phone ?? ''}</td>
                                                            <td>{ButtonHelper.buttonAction(item._id) }</td>
                                                        </tr>
                                                    )
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            );
        }
    }
}
