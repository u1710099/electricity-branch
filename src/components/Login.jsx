import React from 'react';
import { Button } from 'react-bootstrap';
//import background from '../images/background.png'
import '../css/CustAdminLogin.css';
import Login1 from '../images/Login1.png';
import Nav from './Header';
function Login() {

    return (
        <div>
            <Nav></Nav>

            <img src={Login1} alt="electricity" width="100%" height="590px" className="image" ></img>
            <div class="content w-100" style={{
                position: "fixed", bottom: "-10%", backgroundColor: "rgba(0, 0, 0,0.5)",
                color: "#0A0909", padding: "20px", height: "97%"
            }}>
                <div>
                    <h1 className="login-as"><b>Login As</b></h1>

                    <Button variant="outline-dark" className="login-button" onClick={() => window.location.href = "/customerLogin"}><h2><b>Customer</b></h2></Button>
                    <br />
                    <Button variant="outline-dark" className="login-button" onClick={() => window.location.href = "/adminLogin"}><h2><b>Admin </b></h2></Button>

                </div>



            </div>
        </div>
    );

}

export default Login