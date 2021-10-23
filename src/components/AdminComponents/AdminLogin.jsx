import axios from 'axios';
import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import Nav from '../Header';
export default class adminLogin extends Component {
    adminData;
    constructor(props) {

        super(props);

        this.state = {

            adminEmail: '',

            adminPassword: '',

            errors: {}

        }


        this.handleChangeAdminEmail = this.handleChangeAdminEmail.bind(this);

        this.handleChangeAdminPassword = this.handleChangeAdminPassword.bind(this);

        this.submitadminRegistrationForm = this.submitadminRegistrationForm.bind(this);

    }

    handleChangeAdminEmail(e) {

        this.setState({ adminEmail: e.target.value });

    }

    handleChangeAdminPassword(e) {

        this.setState({ adminPassword: e.target.value });

    }


    submitadminRegistrationForm(e) {

        e.preventDefault();
        localStorage.setItem('admin', JSON.stringify(this.state));


        if (this.validateForm()) {

            console.log(this.state);

            var apiBaseUrl = "http://localhost:8081/springfox/api/adminLogin/login";

            var data = {

                "adminEmail": this.state.adminEmail,

                "adminPassword": this.state.adminPassword

            }

            var headers = {

                'Content-Type': 'application/json',

            }

            console.log(data);

            axios.post(apiBaseUrl, data, { headers: headers }).then(function (response) {
                console.log(response);
                window.location = "/adminDashboard";
                alert("success");

            }).catch(function (error) {

                // console.log(error);
                alert(error.response.data.message)

            });

        }

    }


    validateForm() {

        let errors = {};

        let formIsValid = true;
        if (!this.state.adminEmail) {

            formIsValid = false;

            errors["adminEmail"] = "*Please enter your email-ID.";

        }

        if (typeof this.state.adminEmail !== "undefined") {

            //regular expression for email validation

            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

            if (!pattern.test(this.state.adminEmail)) {

                formIsValid = false;

                errors["adminEmail"] = "*Please enter valid email-ID.";

            }

        }


        if (!this.state.adminPassword) {

            formIsValid = false;

            errors["adminPassword"] = "*Please enter your password.";

        }


        this.setState({

            errors: errors

        });

        return formIsValid;

    }
    componentDidMount() {
        window.scrollTo(0, 0)
        this.adminData = JSON.parse(localStorage.getItem('admin'));
        if (localStorage.getItem('admin')) {
            this.setState({
                adminEmail: this.adminData.adminEmail,
                adminPassword: this.adminData.adminPassword

            })
        } else {
            this.setState({
                adminEmail: '',
                adminPassword: ''
            })

        }


    }

    render() {

        return (


            <div>
                <Nav />
                <div className="container" >

                    <div className="row" >

                        <div className="col-md-4 login-sec">

                            <h2 className="text-center">Admin Login</h2>

                            <Form method="post" name="adminRegistrationForm" onSubmit={this.submitadminRegistrationForm} >

                                <FormGroup>
                                    <Input type="Email" name="adminEmail" id="exampleEmail" value={this.state.adminEmail} onChange={this.handleChangeAdminEmail} placeholder="&#xf0e0; Email Id" />

                                    <div className="text-danger">{this.state.errors.adminEmail}</div>

                                </FormGroup>

                                <FormGroup>

                                    <Input type="Password" name="adminPassword" id="examplePassword" value={this.state.adminPassword} onChange={this.handleChangeAdminPassword} placeholder="&#xf084; Password" />

                                    <div className="text-danger">{this.state.errors.adminPassword}</div>

                                </FormGroup>

                                <FormGroup check>

                                    <Label check>

                                        <Input type="checkbox" />{' '}Remember Me
                                    </Label>

                                </FormGroup>

                                <div className="d-flex justify-content-center mt-3 login_container" >

                                    <Button type="submit" className="btn btn-login">Login</Button>

                                </div>

                                <div className="mt-4">
                                    <div className="d-flex justify-content-center links">

                                        <a className="linka" href="/adminForgot">Forgot your password?</a>

                                    </div>

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