import React, { useState } from 'react';

// material components
import {
    DialogContent,
    DialogTitle,
    DialogContentText,
    TextField,
    DialogActions,
    Button
} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

function Register(props) {
    const [whitelist, ] = useState(['errors', 'submitMessage', 'submitError']);
    const [state, setState] = useState({
        email: '',
        username: '',
        password: '',
        password2: '',
        submitError: false,
        errors: {
            email: false,
            username: false,
            password: false,
            password2: false,
        },
        submitMessage: '',
    });

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        const stateCopy = [...Object.keys(state)];
        let fields = {...state.errors};
        let error = false;

        stateCopy.map(key => {
            if (!whitelist.includes(key) && state[key].length === 0) {
                error = true;
                fields[key] = true
            }
        });

        if (error) {
            setState({
                ...state,
                submitError: true,
                errors: {...fields},
                submitMessage: 'Please fill out required fields.'
            })
        }

        if (state.password !== state.password2) {
            error = true;
            fields.password = true;
            fields.password2 = true;
            setState({
                ...state,
                submitError: true,
                errors: fields,
                submitMessage: "Your passwords do not match!"
            })
        }

        if (!error) {
            setState({
                ...state,
                submitError: false,
                submitMessage: ''
            });

            const registerInfo = {
                username: state.username,
                password: state.password,
                email: state.email
            };

            props.authRegister(registerInfo)
        }
    };

    return (
        <div hidden={props.value !== props.index}>
            <DialogTitle id="form-dialog-title">Create an account</DialogTitle>
            <DialogContent>
                <DialogContentText>Create an account now to start your journey towards productivity</DialogContentText>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <TextField
                        error={state.errors.email}
                        margin="dense"
                        name="email"
                        label="Email"
                        value={state.email}
                        onChange={handleChange}
                        variant="outlined"
                        required
                    />
                    <TextField
                        error={state.errors.username}
                        margin="dense"
                        name="username"
                        label="Username"
                        value={state.username}
                        onChange={handleChange}
                        variant="outlined"
                        required
                    />
                    <TextField
                        error={state.errors.password}
                        margin="dense"
                        name="password"
                        label="Password"
                        type="password"
                        value={state.password}
                        onChange={handleChange}
                        variant="outlined"
                        required
                    />
                    <TextField
                        error={state.errors.password2}
                        margin="dense"
                        name="password2"
                        label="Password (again)"
                        type="password"
                        value={state.password2}
                        onChange={handleChange}
                        variant="outlined"
                        required
                    />
                </div>
                {state.submitError ? <Alert severity={"error"}>{state.submitMessage}</Alert> : null}
            </DialogContent>
            <DialogActions>
                <Button onClick={(e) => props.handleTabChange(e, 0)} fullWidth>
                    Already have an account?
                </Button>
            </DialogActions>
            <DialogActions>
                <Button onClick={props.handleClose} color="secondary">
                    Cancel
                </Button>
                <Button style={{backgroundColor: '#4EB6C4', color: '#FFF'}} onClick={handleRegister} variant="contained">
                    Register
                </Button>
            </DialogActions>
        </div>
    );

}

export default Register;