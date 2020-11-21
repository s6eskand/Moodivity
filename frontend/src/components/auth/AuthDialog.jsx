import React from 'react';

// material components
import {
    Tabs,
    Dialog,
    AppBar,
    Tab,
} from "@material-ui/core";

// custom components
import Login from './Login';
import Register from "./Register";

// redux
import withShipment from "../../withShipment";
import {
    authRegister,
    authLogin,
} from "../../redux/actions/auth";


function AuthDialog(props) {

    return(
        <Dialog fullScreen={props.fullScreen} open={props.dialogOpen} onClose={props.handleClose}>
            <AppBar position="static" color="default">
                <Tabs
                    value={props.value}
                    onChange={props.handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                >
                    <Tab label="Login"/>
                    <Tab label="Register"/>
                </Tabs>
            </AppBar>
            <Login
                handleClose={props.handleClose}
                value={props.value}
                index={0}
                handleTabChange={props.handleTabChange}
                authLogin={props.authLogin}
                open={props.open}
            />
            <Register
                handleClose={props.handleClose}
                value={props.value}
                index={1}
                handleTabChange={props.handleTabChange}
                authRegister={props.authRegister}
                open={props.open}
            />
        </Dialog>
    )
}

const mapStateToProps = (state) => ({

});

const actionCreators = {
    authLogin,
    authRegister,
};

export default withShipment({
    mapStateToProps,
    actionCreators,
}, AuthDialog);