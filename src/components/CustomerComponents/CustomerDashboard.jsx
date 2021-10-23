import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CustomerServices from '../../services/CustomerServices';
import Navbar from '../sidebar/Navbar';
import '../../css/dashboard.css'
export default class CustomerDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            address: '',
            costumer: null,
        }
    }
    
    componentDidMount() {
        CustomerServices.getCurrentCostumer().then(res => {
            console.log(res);
            this.setState({costumer: res.data})
            

        });

    }

    render() {
        return (

            <div>
                <Navbar />
                <br />
                <p className='text-right'><i className="fa fa-user" aria-hidden="true"></i> Logged as : {this.state?.costumer?.citizenCardId}</p>

                <h2 className="text-center">YOUR DASHBOARD</h2>
                <div className="container">
                </div>
                <div className="">
                    
                </div>

            </div>
        )
    }
}