import React from 'react';

// images
import logo from '../../media/images/moodivity_logo.png';

// styling
import './Navbar.css';

// material components
import {
    Button,
} from "@material-ui/core";

// constants
import {
    DEMO,
    ABOUT,
    REGISTER,
} from "./constants";

function Navbar() {

    return(
        <nav className="nav">
            <img className="logo" src={logo} alt="Moodivity logo" />
            <div className="container">
                <ul className="nav-links">
                    <li className="nav-link-1">
                        <a href="#">{ABOUT}</a>
                    </li>
                    <li className="nav-link-2">
                        <a href="#">{DEMO}</a>
                    </li>
                </ul>
            </div>
            <button className="action-btn">{REGISTER}</button>
        </nav>
    )

}

export default Navbar;