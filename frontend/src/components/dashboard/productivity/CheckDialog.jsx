import React from 'react';

// material components
import {
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContentText,
    DialogContent,
    Button,
} from "@material-ui/core";

// redux
import withShipment from "../../../withShipment";
import {
    setGoalStatus
} from "../../../redux/actions/logs";

function CheckDialog(props) {

    const handleClose = () => {
        setGoalStatus(props.time);
        props.handleReset();
        props.handleClose();
    };

    const handleOpen = () => {
        setGoalStatus(props.time);
        props.handleReset();
        props.handleClose();
        props.handleOpen();
    };

    return(
        <Dialog open={props.open}>
            <DialogTitle>Are you finished for the day?</DialogTitle>
            <DialogActions>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleClose}
                >
                    Not yet
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleOpen}
                >
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    )
}

const mapStateToProps = (state) => ({

});

const actionCreators = {
    setGoalStatus
};

export default withShipment({
    mapStateToProps,
    actionCreators,
}, CheckDialog)