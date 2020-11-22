import React, { useState, useEffect } from 'react';

// custom components
import LogCard from "./LogCard";

// styling
import './Log.css';

// constants
import {
    MOODS
} from "./constants";

// redux
import withShipment from "../../../withShipment";
import {
    getUserLogs
} from "../../../redux/actions/logs";
import {
    userLogsSelector
} from "../../../redux/selectors/logs";

function Log(props) {

    useEffect(() => {
        props.getUserLogs();
    }, []);

    return(
        <div className="main-logs">
            {props.userLogs.map(log => (
                <LogCard
                    status={log.goalStatus}
                    date={log.date}
                    score={log.score}
                    color={MOODS[log.analysis]}
                    log={log.log}
                />
            ))}
        </div>
    )

}

const mapStateToProps = (state) => ({
    userLogs: userLogsSelector(state),
});

const actionCreators = {
    getUserLogs,
};

export default withShipment({
    mapStateToProps,
    actionCreators,
}, Log);