import React from 'react';

// redux
import withShipment from "../withShipment";
import {
    isAuthenticatedSelector,
} from "../redux/selectors/auth";
import {
    authLogout
} from "../redux/actions/auth";

// components
import Homepage from "../components/homepage/Homepage";
import Dashboard from "../components/dashboard/Dashboard";

function Base(props) {
    return( props.isAuthenticated ? <Dashboard authLogout={props.authLogout} /> : <Homepage /> )
}

const mapStateToProps = (state) => ({
    isAuthenticated: isAuthenticatedSelector(state),
});

const actionCreators = {
    authLogout
};

export default withShipment({
    mapStateToProps,
    actionCreators,
}, Base);
