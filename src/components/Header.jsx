import React from 'react';
import { BiLogInCircle } from "react-icons/bi";
import { FaPencilAlt } from "react-icons/fa";
import { HiPhone } from "react-icons/hi";
import { RiQuestionAnswerLine } from "react-icons/ri";
import Logo from '../images/logo1.png';
function Header() {
    return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-dark" style={{
                backgroundColor: "#02B7B8",
                fontSize: "30px", fontFamily: "Times New Roman, Times, Fantasy"
            }}>
                <div class="container-fluid">
                    <a className="navbar-brand mb-0 h1" aria-current="page" href="#"> Electricity-Billing-System</a>
                    <ul className="nav justify-content-end" >

                        <li className="nav-item">
                            <a className="navbar-brand" aria-current="page" href="/"><i className="fa fa-home"></i> Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="navbar-brand" href="about"><FaPencilAlt size={17} /> About Us</a>
                        </li>
                        <li className="nav-item">
                            <a className="navbar-brand" href="/contact"><HiPhone size={17} /> Contact Us</a>
                        </li>
                        <li className="nav-item">
                            <a className="navbar-brand" href="/login" ><BiLogInCircle size={17} /> Login</a>
                        </li>
                        <li className="nav-item">
                            <a className="navbar-brand" href="/faq" ><RiQuestionAnswerLine size={17} /> FAQ</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>

    );

}

export default Header