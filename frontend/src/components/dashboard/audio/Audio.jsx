import React, { useState } from 'react';

// recording
import AudioReactRecorder, { RecordState } from 'audio-react-recorder'

// material components
import {
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContentText,
    DialogContent,
    Button,
} from "@material-ui/core";

// material icons
import {
    Mic,
    Stop
} from "@material-ui/icons";

// redux
import withShipment from "../../../withShipment";
import {
    createUserLog,
} from "../../../redux/actions/logs";
import {
    goalStatusSelector,
    loadingSelector,
} from "../../../redux/selectors/logs";
import {ownerSelector} from "../../../redux/selectors/auth";

function Audio(props) {
    const [state, setState] = useState({
        audio: {},
        base64audio: '',
        recording: RecordState.NONE,
        isRecording: false,
    });

    const handleSubmit = () => {
        const data = {
            owner: props.owner,
            audio: state.base64audio,
            goalStatus: props.goalStatus,
        };

        props.createUserLog(data);
        props.handleClose()
    };

    const handleStart = () => {
        setState({
            ...state,
            recording: RecordState.START,
            isRecording: true,
        })
    };

    const handleStop = () => {
        setState({
            ...state,
            recording: RecordState.STOP,
            isRecording: false,
        });
    };

    const handleData = (audio) => {
        const reader = new FileReader;
        reader.readAsDataURL(audio.blob);
        reader.onload = function(e) {
            const base64audio = reader.result;
            setState({
                ...state,
                base64audio,
                audio: audio
            })
        };
    };

    return(
        <>
        <Dialog maxWidth="lg" className="dialog-main" open={props.open}>
            <DialogTitle>Record an audio log</DialogTitle>
            <DialogContent>
                <DialogContentText>Record a reflection and our powerful AI will analyze your mood, providing feedback based off your sentiment and goal progress</DialogContentText>
                <div>
                    <p>Hit start to record an audio log, reflecting on your day</p>
                    <div className="audio-outline">
                        <AudioReactRecorder
                            canvasHeight={0}
                            state={state.recording}
                            onStop={handleData}
                        />
                    </div>
                    <Button
                        id="start-btn"
                        onClick={handleStart}
                        disabled={state.isRecording}
                        variant="outlined"
                    >
                        <Mic style={{paddingRight: '3px'}} /> Start
                    </Button>
                    <Button
                        id="stop-btn"
                        onClick={handleStop}
                        variant="outlined"
                        disabled={!state.isRecording}
                    >
                        <Stop style={{paddingRight: '3px'}} /> Stop
                    </Button>
                </div>
                <audio style={{marginTop: '10px'}} src={state.base64audio} controls/>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={props.handleClose}
                >
                    Not today
                </Button>
                <Button
                    disabled={state.base64audio.length === 0}
                    color="primary"
                    variant="outlined"
                    onClick={handleSubmit}
                >
                    Analyze
                </Button>
            </DialogActions>
        </Dialog>
        </>
    )

}

const mapStateToProps = (state) => ({
    loading: loadingSelector(state),
    goalStatus: goalStatusSelector(state),
    owner: ownerSelector(state)
});

const actionCreators = {
    createUserLog,
};

export default withShipment({
    mapStateToProps,
    actionCreators,
}, Audio);