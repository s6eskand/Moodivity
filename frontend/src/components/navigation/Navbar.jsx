import React, { useState } from 'react';

// images
import logo from '../../media/images/moodivity_logo.png';

// styling
import './Navbar.css';

// material components
import {
    useMediaQuery
} from "@material-ui/core";

// constants
import {
    DEMO,
    ABOUT,
    REGISTER,
} from "./constants";

// custom components
import AuthDialog from "../auth/AuthDialog";

function Navbar() {
    const fullScreen = useMediaQuery('(max-width:600px)');
    const [state, setState] = useState({
        openDialog: false,
        value: 1,
    });

    const handleOpen = () => {
        setState({
            value: 1,
            openDialog: true,
        })
    };

    const handleClose = () => {
        setState({
            ...state,
            openDialog: false,
        })
    };

    const handleTabChange = (e, newValue) => {
        setState({
            ...state,
            value: newValue,
        })
    };

    return(
        <>
        <AuthDialog
            dialogOpen={state.openDialog}
            handleTabChange={handleTabChange}
            handleClose={handleClose}
            value={state.value}
            fullScreen={fullScreen}
        />
        <nav className="nav">
            <img className="logo" src={logo} alt="Moodivity logo" />
            <div className="container">
                <ul className="nav-links">
                    <li className="nav-link-1">
                        <a href="">{ABOUT}</a>
                    </li>
                    <li className="nav-link-2">
                        <a href="">{DEMO}</a>
                    </li>
                </ul>
            </div>
            <button className="action-btn" onClick={handleOpen}>{REGISTER}</button>
        </nav>
        </>
    )

}

export default Navbar;