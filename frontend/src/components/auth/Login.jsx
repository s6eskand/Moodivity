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

function Login(props) {
    const [state, setState] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    };

    const handleLogin = () => {
        const loginInfo = {
            username: state.username,
            password: state.password,
        };

        props.authLogin(loginInfo)
    };

    return (
        <div className="dialog-container" hidden={props.value !== props.index}>
            {/*<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px'}}>*/}
            {/*    <img style={{width: '100px'}} src={logo} alt="foolstack blue logo"/>*/}
            {/*</div>*/}
            <DialogTitle id="form-dialog-title">Login to your Moodivity account</DialogTitle>
            <DialogContent>
                <DialogContentText>Enter your credentials below to start your productive day!</DialogContentText>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="username"
                        label="Username"
                        value={state.username}
                        onChange={handleChange}
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        name="password"
                        label="Password"
                        type="password"
                        value={state.password}
                        onChange={handleChange}
                        variant="outlined"
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={(e) => props.handleTabChange(e, 1)} fullWidth>
                    Don't have an account? Create one here.
                </Button>
            </DialogActions>
            <DialogActions>
                <Button onClick={props.handleClose} color="secondary">
                    Cancel
                </Button>
                <Button style={{backgroundColor: '#4EB6C4', color: '#FFF'}} onClick={handleLogin} variant="contained">
                    Login
                </Button>
            </DialogActions>
        </div>
    );
}

export default Login;