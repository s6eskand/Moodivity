import React, { useState, useEffect } from 'react';

// styling
import './Profile.css';

// constants
import {
    GOALS,
    TIMES,
} from "./constants";

// material components
import {
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@material-ui/core";

// material icons
import {
    Edit
} from "@material-ui/icons";

// redux
import withShipment from "../../../withShipment";
import {
    setGoalStatus
} from "../../../redux/actions/logs";
import {
    editUserProfile,
    getUserProfile
} from "../../../redux/actions/profile";
import {
    ownerSelector,
} from "../../../redux/selectors/auth";
import {userProfileSelector} from "../../../redux/selectors/profile";

function Profile(props) {
    const [state, setState] = useState({
        isEdit: false,
        count: 0,
        name: '',
        activities: [],
        activitiesString: '',
        startTime: '00:00',
        endTime: '00:00',
        prodGoal: 1
    });

    useEffect(() => {
        props.getUserProfile();
        setState({
            ...state,
            name: props.userProfile.name,
            activities: props.userProfile.activities,
            startTime: props.userProfile.startTime,
            endTime: props.userProfile.endTime,
            prodGoal: props.userProfile.prodGoal,
        })
    }, [props.userProfile]);

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    };

    const handleEdit = () => {
        if (state.count === 0) {
            setState({
                ...state,
                isEdit: true,
                count: 1,
                activitiesString: state.activities.join(',')
            })
        } else {
            setState({
                ...state,
                isEdit: false,
                count: 0,
                activities: state.activitiesString.split(',')
            });

            const data = {
                id: props.userProfile.id,
                name: state.name,
                activities: state.activities,
                startTime: state.startTime,
                prodGoal: state.prodGoal,
                owner: props.owner,
            };

            props.setGoalStatus(state.prodGoal);
            props.editUserProfile(data);
        }
    };

    return(
        <div>
            <div className="section">
                <h1 className="profile-title">Full Name</h1>
                {state.isEdit ?
                    <TextField
                        label="Name"
                        variant="outlined"
                        margin="dense"
                        value={state.name}
                        name="name"
                        onChange={handleChange}
                    />
                    :
                    <p>{state.name}</p>
                }
            </div>
            <div className="section">
                <h2 className="profile-title">Daily Goal</h2>
                {state.isEdit ?
                    <FormControl margin="dense" variant="outlined" style={{width: '100px'}}>
                        <InputLabel>Goal</InputLabel>
                        <Select
                            label="Goal"
                            variant="outlined"
                            name="prodGoal"
                            value={state.prodGoal}
                            onChange={handleChange}
                        >
                            {GOALS.map(goal => (
                                <MenuItem value={goal}>{goal}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    :
                    <p>Current goal set to {state.prodGoal}h</p>}
            </div>
            <div className="section">
                <h2 className="profile-title">Daily Interval</h2>
                {state.isEdit ?
                    <div style={{display: 'flex'}}>
                        <FormControl margin="dense" variant="outlined" style={{marginRight: '10px', width: '100px'}}>
                            <InputLabel>Start</InputLabel>
                            <Select
                                label="Start"
                                name="startTime"
                                value={state.startTime}
                                onChange={handleChange}
                            >
                                {TIMES.map(time => (
                                    <MenuItem value={time}>{time}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl margin="dense" variant="outlined" style={{width: '100px'}}>
                        <InputLabel>End</InputLabel>
                        <Select
                            label="End"
                            name="endTime"
                            value={state.endTime}
                            onChange={handleChange}
                        >
                            {TIMES.map(time => (
                                <MenuItem value={time}>{time}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    </div>
                    :
                    <p>Work ranging from {state.startTime} to {state.endTime}</p>}
            </div>
            <div className="section">
                <h2 className="profile-title">Activities</h2>
                {state.isEdit ?
                    <TextField
                        margin="dense"
                        variant="outlined"
                        value={state.activitiesString}
                        onChange={handleChange}
                        name="activitiesString"
                    />
                    :
                    <div style={{width: '400'}}>
                        {state.activities.map(activity => (
                            <Button variant="outlined" style={{width: 'auto', margin: '5px'}}>{activity}</Button>
                        ))}
                    </div>
                }
            </div>
            <div className="section">
                <Button
                    onClick={handleEdit}
                    style={{width: 'auto'}}
                    variant="outlined"
                >
                    <Edit style={{paddingRight: '3px'}} /> {state.isEdit ? 'Save' : 'Edit'}
                </Button>
            </div>
        </div>
    )

}

const mapStateToProps = (state) => ({
    owner: ownerSelector(state),
    userProfile: userProfileSelector(state),
});

const actionCreators = {
    editUserProfile,
    getUserProfile,
    setGoalStatus,
};

export default withShipment({
    mapStateToProps,
    actionCreators,
}, Profile);