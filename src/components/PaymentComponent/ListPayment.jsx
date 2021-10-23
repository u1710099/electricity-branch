import dateFormat from 'dateformat';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PayementService from '../../services/PayementService';
import Nav from '../Navbar';
class ListPayment extends Component {
    constructor(props) {
        super(props)

        this.state = {
            payments: []
        }
        this.deletePayment = this.deletePayment.bind(this);
    }

    deletePayment(id) {
        PayementService.deletePayment(id).then(res => {
            this.setState({ payments: this.state.payments.filter(payment => payment.id !== id) });
        });
    }

    componentDidMount() {
        PayementService.getAllPayment().then((pay) => {
            this.setState({ payments: pay.data });
        });
    }
    dateFormatHandler = (cardExpiryDate) => {
        return dateFormat(cardExpiryDate, "dd-mm-yyyy");
    }

    dateFormatHandle = (paymentDate) => {
        return dateFormat(paymentDate, "dd-mm-yyyy h:MM TT");
    }

    render() {
        return (
            <div>
                <Nav /><br />
                <h2 className="text-center">Payment List</h2>
                <br></br>
                <div className="row">
                    <div className="container  mb-1  mt-0 ">
                    <Link href="/adminDashboard" to="/adminDashboard"><button className="btn btn-primary" style={{marginBottom:"10px"}}>Back</button></Link>
                        <table className="table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th>Customer ID</th>
                                    <th> Card Number</th>
                                    <th>Card Holder Name</th>
                                    <th> Card Expiry Date</th>
                                    <th> Bill Amount</th>
                                    <th>Payment Date</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.payments.map(
                                        payment =>
                                            <tr key={payment.id}>
                                                <td>{payment.customer.id}</td>
                                                <td> {payment.cardNumber} </td>
                                                <td> {payment.cardHolderName}</td>
                                                <td> {this.dateFormatHandler(payment.cardExpiryDate)}</td>
                                                <td> {payment.billAmount}</td>
                                                <td>{this.dateFormatHandle(payment.paymentDate)}</td>
                                                <td>
                                                    <button style={{ marginLeft: "10px" }} onClick={() => this.deletePayment(payment.id)} className="btn btn-danger">Delete </button>
                                                </td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>

                    </div>

                </div>
            </div>
        )
    }
}

export default ListPayment;
