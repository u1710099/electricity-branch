import React, { Component } from 'react';
import { RiBillLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import CustomerServices from '../../services/CustomerServices';
import Nav from '../Navbar';

export default class customerList extends Component {
    constructor(props) {
        super(props)

        this.state = {


            customers: [],

        };
        this.viewCustomer = this.viewCustomer.bind(this);

    }
    viewCustomer(id) {
        this.props.history.push(`/viewSingleCustomer/${id}`);
    }

    componentDidMount() {

        CustomerServices.getAllCustomer().then((res) => {
            this.setState({ customers: res.data });
        });
    }

    render() {
        return (
            <div>
                <Nav /><br></br>
                <h3 className="text-center">ALL Customer List</h3>
                <div className="container" >
                <Link href="/adminDashboard" to="/adminDashboard"><button className="btn btn-primary" style={{ marginBottom: "10px" }}> Back</button></Link>
                    <table className="table table-striped table-bordered table-hover " style={{ width: "100%" }}>
                        <thead className="thead-dark">
                            <tr className="text-center">
                                <th>Customer ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Mobile No.</th>
                                <th>Address</th>
                                <th>State</th>
                                <th>City</th>
                                <th>Pincode</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-center" >
                            {
                                this.state.customers.map(
                                    customer =>
                                        <tr key={customer.id}>
                                            <td>{customer.id}</td>
                                            <td>{customer.firstName}</td>
                                            <td>{customer.lastName}</td>
                                            <td>{customer.email}</td>
                                            <td>{customer.mobile}</td>
                                            <td>{customer.address}</td>
                                            <td>{customer.state}</td>
                                            <td>{customer.city}</td>
                                            <td>{customer.pincode}</td>
                                            <td>

                                                <button className="btn btn-info" style={{ marginLeft: "5" }} onClick={() => this.viewCustomer(customer.id)} title="View Customer Details"><RiBillLine size='1.5rem'>View Customer</RiBillLine></button>

                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
