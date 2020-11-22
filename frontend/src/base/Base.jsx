import React from 'react';

// redux
import withShipment from "../withShipment";
import {
    isAuthenticatedSelector,
} from "../redux/selectors/auth";

// components
import Homepage from "../components/homepage/Homepage";
import Dashboard from "../components/dashboard/Dashboard";

function Base(props) {
    return( props.isAuthenticated ? <Homepage/> : <Dashboard/> )
}

const mapStateToProps = (state) => ({
    isAuthenticated: isAuthenticatedSelector(state),
});

const actionCreators = {

};

export default withShipment({
    mapStateToProps,
    actionCreators,
}, Base);
