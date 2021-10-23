import dateFormat from 'dateformat';
import React, { Component } from 'react';
import { MdDelete } from 'react-icons/md';
import { RiBillLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { Input } from 'reactstrap';
import BillService from '../../services/BillService';
import Nav from '../Navbar';
export default class ViewBillList extends Component {
    constructor(props) {
        super(props)

        this.state = {

            searchMonth: '',
            searchStatus: '',
            searchCustId: '',
            bills: [],

        };
        this.viewBill = this.viewBill.bind(this);
        this.deleteBill = this.deleteBill.bind(this);
        this.onChangeSearchMonth = this.onChangeSearchMonth.bind(this);
        this.onChangeSearchStatus = this.onChangeSearchStatus.bind(this);
        this.onChangeSearchCustId = this.onChangeSearchCustId.bind(this);
    }
    onChangeSearchMonth = e => {
        this.setState({ searchMonth: e.target.value.substr(0, 20) });
    }
    onChangeSearchStatus = e => {
        this.setState({ searchStatus: e.target.value.substr(0, 20) });
    }
    onChangeSearchCustId = e => {
        this.setState({ searchCustId: e.target.value });
    }
    viewBill(id) {

        this.props.history.push(`/adminViewBill/${id}`);
    }
    deleteBill(id) {

        const r = window.confirm("Are you sure you want to delete this item?");
        if (r == true) {
            BillService.deleteBill(id).then(function (response) {
                console.log(response);
                alert("Bill deleted ");
                window.location = "/allBills";
            }).catch(function (error) {
                alert(error.response.data.message);
                console.log(error);

            });
        }

        //this.props.history.push(`/deleteBill/${id}`);
    }
    componentDidMount() {
        BillService.getAllBill().then((res) => {
            this.setState({ bills: res.data });

        });

    }
    dateFormatHandler = (startDate) => {
        return dateFormat(startDate, "dd-mm-yyyy");
    }
    dateFormatHandler = (endDate) => {
        return dateFormat(endDate, "dd-mm-yyyy");
    }
    render() {
        let filterBills = this.state.bills.filter(
            (bill) => {
                if (this.state.searchStatus) {
                    return bill.paymentStatus.charAt(0).toUpperCase().indexOf(this.state.searchStatus.charAt(0).toUpperCase()) !== -1;

                }
                if (this.state.searchMonth) {
                    return bill.month.toLowerCase().indexOf(this.state.searchMonth.toLowerCase()) !== -1;

                }

                if (this.state.searchCustId) {
                    var custId = bill.customer.id.toString();
                    return custId.indexOf(this.state.searchCustId) !== -1;
                }
                else {
                    return bill.month.toLowerCase().indexOf(this.state.searchMonth.toLowerCase()) !== -1;
                }

            }
        );
        return (
            <div>
                <Nav />
                <h3 className="text-center  mb-4  mt-4 " >ALL Customer Bills</h3>
                <Link href="/adminDashboard" to="/adminDashboard"><button className="btn btn-info" style={{ marginLeft: '6%', marginBottom: '1%' }}>Back</button></Link>

                <div className="container  mb-1  mt-0 ">

                    <table className="table table-striped table-bordered table-hover ">
                        <thead className="thead-dark" style={{ width: 'auto' }}>
                            <tr>
                                <th style={{ width: "16%" }}>Customer Id</th>
                                <th>Bill ID</th>
                                <th>Start Date</th>
                                <th>Due Date</th>
                                <th>Month</th>
                                <th>Payment Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <Input className="w-100" onChange={this.onChangeSearchCustId} placeholder="&#xF002;  Customer Id" />
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <Input onChange={this.onChangeSearchMonth} placeholder="&#xF002;  Enter Month" />
                                </td>
                                <td>
                                    <Input onChange={this.onChangeSearchStatus} placeholder="&#xF002;  Paid/Unpaid" />
                                </td>
                                <td></td>
                            </tr>
                            {
                                filterBills.map(
                                    bill =>
                                        <tr key={bill.id}>
                                            <td>{bill.customer.id}</td>
                                            <td>{bill.id}</td>
                                            <td >{this.dateFormatHandler(bill.startDate)}</td>
                                            <td>{this.dateFormatHandler(bill.endDate)}</td>
                                            <td>{bill.month}</td>
                                            <td>{bill.paymentStatus}</td>
                                            <td>

                                                <button className="btn btn-info" style={{ marginLeft: "12px" }} onClick={() => this.viewBill(bill.id)} title="View Bill"><RiBillLine size='1.5rem'>View Bill</RiBillLine></button>

                                                <button className="btn btn-danger" style={{ marginLeft: "15px" }} title="Delete Bill"><MdDelete size='1.5rem' onClick={() => this.deleteBill(bill.id)}>Delete Bill</MdDelete></button>
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
