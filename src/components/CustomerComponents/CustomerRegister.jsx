import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Nav from '../Header';
export default class CustomerRegister extends Component{
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            mobile: '',
            password: '',
            errors: {}
        }
        this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
        this.handleChangeLastName = this.handleChangeLastName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeMobile = this.handleChangeMobile.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);

        this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);

    }
    handleChangeFirstName(e) {
        this.setState({ firstName: e.target.value });
    }
    handleChangeLastName(e) {
        this.setState({ lastName: e.target.value });
    }
    handleChangeEmail(e) {

        this.setState({ email: e.target.value });

    }

    handleChangeMobile(e) {

        this.setState({ mobile: e.target.value });

    }

    handleChangePassword(e) {

        this.setState({ password: e.target.value });

    }

    submituserRegistrationForm(e) {

        e.preventDefault();

        if (this.validateForm()) {

            console.log(this.state);

            var apiBaseUrl = "http://localhost:8081/springfox/api/customer/";

            var data = {
                "firstName": this.state.firstName,
                "lastName": this.state.lastName,
                "email": this.state.email,
                "mobile": this.state.mobile,
                "password": this.state.password

            }

            var headers = {

                'Content-Type': 'application/json',

            }

            console.log(data);

            axios.post(apiBaseUrl, data, { headers: headers }).then(function (response) {

                console.log(response);
                window.location = "/customerLogin"
                alert("Registration Successfull!! Check email for verification.")

            }).catch(function (error) {
                alert(error.response.data.message);
                console.log(error);

            });

        }

    }

    validateForm() {

        let errors = {};

        let formIsValid = true;
        if (!this.state.firstName) {

            formIsValid = false;

            errors["firstName"] = "*Please enter your first name.";

        }
       else if (typeof this.state.firstName !== "undefined") {

            //regular expression for email validation

            if (!this.state.firstName.match(/^[A-Z][a-zA-Z ]*$/)) {

                formIsValid = false;
                
                errors["firstName"] = "*Please enter first letter capital and alphabet characters only.";
            }
                
        }
        if (!this.state.lastName) {

            formIsValid = false;

            errors["lastName"] = "*Please enter your last name.";

        }
       else if (typeof this.state.lastName !== "undefined") {

            //regular expression for email validation

            if (!this.state.lastName.match(/^[A-Z][a-zA-Z ]*$/)) {

                formIsValid = false;
                
                errors["lastName"] = "*Please enter first letter capital and alphabet characters only.";
            }
                
        }

        if (!this.state.email) {

            formIsValid = false;

            errors["email"] = "*Please enter your email-ID.";

        }

      else  if (typeof this.state.email !== "undefined") {

            //regular expression for email validation

            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

            if (!pattern.test(this.state.email)) {

                formIsValid = false;

                errors["email"] = "*Please enter valid email-ID.";

            }

        }

        if (!this.state.mobile) {

            formIsValid = false;

            errors["mobile"] = "*Please enter your mobile no.";

        }

       else if (typeof this.state.mobile !== "undefined") {

            if (!this.state.mobile.match(/^[7-9][0-9]{9}$/)) {

                formIsValid = false;

                errors["mobile"] = "*Please enter valid mobile no.";

            }

        }

        if (!this.state.password) {

            formIsValid = false;

            errors["password"] = "*Please enter your password.";

        }

       else if (typeof this.state.password !== "undefined") {

            if (!this.state.password.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {

                formIsValid = false;

                errors["password"] = "*Please enter secure and strong password.";

            }

        }

        this.setState({

            errors: errors

        });

        return formIsValid;

    }

    render() {

        return (

            <div>
                <Nav/>
                <div className="container" > 

                    <div className="row" >

                        <div className="col-md-4 login-sec">

                            <h2 className="text-center">Customer Registration</h2>

                            <Form method="post" name="userRegistrationForm" onSubmit={this.submituserRegistrationForm}>

                                <FormGroup>

                                    <Label for="exampleName">First Name</Label>

                                    <Input type="text" name="firstName" id="firstName" value={this.state.firstName} onChange={this.handleChangeFirstName} placeholder="Enter your first name" />

                                    <div className="text-danger">{this.state.errors.firstName}</div>

                                </FormGroup>
                                <FormGroup>

                                    <Label for="exampleName">Last Name</Label>

                                    <Input type="text" name="lastName" id="lastName" value={this.state.lastName} onChange={this.handleChangeLastName} placeholder="Enter your last name" />

                                    <div className="text-danger">{this.state.errors.lastName}</div>

                                </FormGroup>

                                <FormGroup>

                                    <Label for="exampleEmail">Email</Label>

                                    <Input type="email" name="email" id="email" value={this.state.email} onChange={this.handleChangeEmail} placeholder="Enter a email" />

                                    <div className="text-danger">{this.state.errors.email}</div>

                                </FormGroup>

                                <FormGroup>

                                    <Label for="exampleMobile">Mobile No.</Label>

                                    <Input type="text" name="mobile" id="mobile" value={this.state.mobile} onChange={this.handleChangeMobile} placeholder="Enter a Mobile No." />

                                    <div className="text-danger">{this.state.errors.mobile}</div>

                                </FormGroup>



                                <FormGroup>

                                    <Label for="examplePassword">Password</Label>

                                    <Input type="password" name="password" id="password" value={this.state.password} onChange={this.handleChangePassword} placeholder="Enter a password" />

                                    <div className="text-danger">{this.state.errors.password}</div>

                                </FormGroup>

                                <div className="d-flex justify-content-center mt-3 login_container">

                                    <Button type="submit" className="btn btn-submit">Submit</Button>

                                </div>

                                <div className="mt-4">

                                    <div className="d-flex justify-content-center links">

                                        <Link href="/customerLogin" to="/customerLogin" className="linka">Already Account Login </Link>

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