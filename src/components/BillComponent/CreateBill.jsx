import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import AdminServices from '../../services/AdminServices';
import Nav from '../Navbar';

export default class CreateBill extends Component {


    constructor(props) {
        super(props);
        this.state = {

            meterId: '',
            fixCharge: '',
            previousReading: '',
            currentReading: '',
            paymentStatus: '',
            startDate: '',
            endDate: '',
            month: '',
            custId: '',
            adminId: 0,
            errors: {}


        }
        this.handleChangeMeterId = this.handleChangeMeterId.bind(this);
        this.handleChangeFixCharge = this.handleChangeFixCharge.bind(this);
        this.handleChangePreviousReading = this.handleChangePreviousReading.bind(this);
        this.handleChangeCurrentReading = this.handleChangeCurrentReading.bind(this);
        this.handleChangePaymentStatus = this.handleChangePaymentStatus.bind(this);
        this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
        this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
        this.handleChangeMonth = this.handleChangeMonth.bind(this);
        this.handleChangeCustId = this.handleChangeCustId.bind(this);


        this.createBill = this.createBill.bind(this);
    }
    componentDidMount() {
        let details = localStorage.getItem('admin');
        details = JSON.parse(details);
        let email = details.adminEmail;
        AdminServices.getAdminIdByEmail(email).then(res => {
            this.setState({ adminId: parseInt(res.data) });

        });

    }
    handleChangeMeterId(e) {
        this.setState({ meterId: e.target.value });
    }
    handleChangeFixCharge(e) {
        this.setState({ fixCharge: e.target.value });
    }
    handleChangePreviousReading(e) {
        this.setState({ previousReading: e.target.value });
    }
    handleChangeCurrentReading(e) {
        this.setState({ currentReading: e.target.value });
    }
    handleChangePaymentStatus(e) {
        this.setState({ paymentStatus: e.target.value });
    }
    handleChangeStartDate(e) {
        this.setState({ startDate: e.target.value });
    }
    handleChangeEndDate(e) {
        this.setState({ endDate: e.target.value });
    }
    handleChangeMonth(e) {
        this.setState({ month: e.target.value });
    }
    handleChangeCustId(e) {
        this.setState({ custId: e.target.value });
    }


    createBill(e) {

        e.preventDefault();

        if (this.validateForm()) {
            console.log(this.state);

            var apiBaseUrl = "http://localhost:8081/springfox/api/billDetails/add";

            var data = {
                "meterId": this.state.meterId,
                "fixCharge": this.state.fixCharge,
                "previousReading": this.state.previousReading,
                "currentReading": this.state.currentReading,
                "paymentStatus": this.state.paymentStatus,
                "startDate": this.state.startDate,
                "endDate": this.state.endDate,
                "month": this.state.month,
                "custId": this.state.custId,
                "adminId": this.state.adminId

            }

            var headers = {

                'Content-Type': 'application/json',

            }

            console.log(data);

            axios.post(apiBaseUrl, data, { headers: headers }).then(function (response) {

                console.log(response);
                window.location = "/adminDashboard"
                alert("Bill Created")

            }).catch(function (error) {
                alert(error.response.data.message);
                console.log(error);

            });

        }

    }
    validateForm() {
        let errors = {};
        let formIsValid = true;
        if (!this.state.meterId) {

            formIsValid = false;
            errors["meterId"] = "*Please Enter Meter Id.";

        }
        else if (typeof this.state.meterId !== "undefined") {

            //regular expression for meterId validation

            if (!this.state.meterId.match(/^[0-9]*$/)) {
                formIsValid = false;
                errors["meterId"] = "*Please Enter valid Meter Id";
            }

        }
        if (!this.state.fixCharge) {

            formIsValid = false;
            errors["fixCharge"] = "*Please Enter Fixed Charge.";

        }
        else if (typeof this.state.fixCharge !== "undefined") {

            //regular expression for fixCharge validation

            if (!this.state.fixCharge.match(/^[0-9]*$/)) {
                formIsValid = false;
                errors["fixCharge"] = "*Please Enter valid Fixed Charge";
            }

        }
        if (!this.state.previousReading) {

            formIsValid = false;
            errors["previousReading"] = "*Please Enter Previous Reading.";

        }
        else if (typeof this.state.previousReading !== "undefined") {

            //regular expression for fixCharge validation

            if (!this.state.previousReading.match(/^[0-9]*$/)) {
                formIsValid = false;
                errors["previousReading"] = "*Please Enter valid Previous Reading";
            }

        }
        if (!this.state.currentReading) {

            formIsValid = false;
            errors["currentReading"] = "*Please Enter Current Reading.";

        }
        else if (typeof this.state.currentReading !== "undefined") {

            //regular expression for fixCharge validation

            if (!this.state.currentReading.match(/^[0-9]*$/)) {
                formIsValid = false;
                errors["currentReading"] = "*Please Enter valid Current Reading";
            }

        }
        if (!this.state.startDate) {

            formIsValid = false;
            errors["startDate"] = "*Please Enter Start Date.";

        }
        if (!this.state.endDate) {

            formIsValid = false;
            errors["endDate"] = "*Please Enter End Date.";

        }
        if (!this.state.month) {

            formIsValid = false;
            errors["month"] = "*Please Enter Month.";

        }
        if (!this.state.custId) {

            formIsValid = false;
            errors["custId"] = "*Please Enter Customer Id.";

        }
        else if (typeof this.state.custId !== "undefined") {

            //regular expression for fixCharge validation

            if (!this.state.custId.match(/^[0-9]*$/)) {
                formIsValid = false;
                errors["custId"] = "*Please Enter valid Customer Id";
            }

        }
        if (!this.state.paymentStatus) {

            formIsValid = false;
            errors["paymentStatus"] = "*Please Enter Payment Status.";

        }
        this.setState({

            errors: errors

        });

        return formIsValid;

    }

    render() {
        return (
            <div>
                <Nav />

                <div className="container" >

                    <div className="row" >

                        <div className="col-md-4 login-sec">

                            <h2 className="text-center">Create Bill</h2>

                            <Form method="post" name="createBillForm" onSubmit={this.createBill}>

                                <FormGroup>

                                    <Label>Meter Id</Label>

                                    <Input type="text" name="meterId" id="meterId" placeholder="Enter meter Id" value={this.state.meterId} onChange={this.handleChangeMeterId} />
                                    <div className="text-danger">{this.state.errors.meterId}</div>
                                </FormGroup>

                                <FormGroup>

                                    <Label>Fixed Charge</Label>

                                    <Input type="number" name="fixCharge" id="fixCharge" placeholder="Enter Fixed Charge" value={this.state.fixCharge} onChange={this.handleChangeFixCharge} />
                                    <div className="text-danger">{this.state.errors.fixCharge}</div>

                                </FormGroup>

                                <FormGroup>

                                    <Label>Previous Reading</Label>

                                    <Input type="number" name="previousReading" id="previousReading" placeholder="Enter Previous Reading" value={this.state.previousReading} onChange={this.handleChangePreviousReading} />
                                    <div className="text-danger">{this.state.errors.previousReading}</div>

                                </FormGroup>
                                <FormGroup>

                                    <Label>Current Reading</Label>

                                    <Input type="number" name="currentReading" id="currentReading" placeholder="Enter Current Reading" value={this.state.currentReading} onChange={this.handleChangeCurrentReading} />
                                    <div className="text-danger">{this.state.errors.currentReading}</div>
                                </FormGroup>
                                <FormGroup>

                                    <Label>Payment Status</Label>

                                    <select style={{ width: '270px', height: '40px', borderRadius: '3%', border: 'white' }} type="text" name="paymentStatus" id="paymentStatus" placeholder="Enter Payment Status" value={this.state.paymentStatus} onChange={this.handleChangePaymentStatus}>
                                        <option></option>
                                        <option value="Unpaid">Unpaid</option>
                                    </select>
                                    <div className="text-danger">{this.state.errors.paymentStatus}</div>

                                </FormGroup>
                                <FormGroup>

                                    <Label>Start Date</Label>

                                    <Input type="date" name="startDate" id="startDate" placeholder="Enter Start Date" value={this.state.startDate} onChange={this.handleChangeStartDate} />
                                    <div className="text-danger">{this.state.errors.startDate}</div>

                                </FormGroup>

                                <FormGroup>

                                    <Label>Due Date</Label>

                                    <Input type="date" name="endDate" id="endDate" placeholder="Enter Due Date" value={this.state.endDate} onChange={this.handleChangeEndDate} />
                                    <div className="text-danger">{this.state.errors.endDate}</div>
                                </FormGroup>
                                <FormGroup>

                                    <Label>Bill For the Month</Label>


                                    <select style={{ width: '270px', height: '40px', borderRadius: '3%', border: 'white' }} name="month" id="month" placeholder="Bill For the Month" value={this.state.month} onChange={this.handleChangeMonth}>
                                        <option value="January">January</option>
                                        <option value="February">February</option>
                                        <option value="March">March</option>
                                        <option value="April">April</option>
                                        <option value="May">May</option>
                                        <option value="June">June</option>
                                        <option value="July">July</option>
                                        <option value="August">August</option>
                                        <option value="September">September</option>
                                        <option value="October">October</option>
                                        <option value="November">November</option>
                                        <option value="December">December</option></select>

                                    <div className="text-danger">{this.state.errors.month}</div>
                                </FormGroup>

                                <FormGroup>

                                    <Label>Customer Id</Label>

                                    <Input type="number" name="custId" id="custId" placeholder="Enter Customer Id" value={this.state.custId} onChange={this.handleChangeCustId} />
                                    <div className="text-danger">{this.state.errors.custId}</div>
                                </FormGroup>


                                <div className="d-flex justify-content-center mt-3 login_container">

                                    <button type="submit" className="btn btn-info" onClick={this.createBill}>Create</button>
                                    <Link href="/adminDashboard" to="/adminDashboard"><button className="btn btn-secondary" style={{ marginLeft: "12px" }}>Back</button></Link>

                                </div>

                            </Form>

                        </div>

                        <div className="col-md-8 banner-sec"></div>

                    </div>

                </div>

            </div>
        )
    }
}
