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
    PlayCircleOutline,
    Stop
} from "@material-ui/icons";

function Audio(props) {
    const [state, setState] = useState({
        audio: {},
        base64audio: '',
        recording: RecordState.NONE,
    });

    const handleSubmit = () => {
        const reader = new FileReader;
        reader.readAsDataURL(state.audio.blob);
        reader.onload = function(e) {
            const base64audio = reader.result;
            setState({
                ...state,
                base64audio,
            })
        };
    };

    const handleStart = () => {
        setState({
            ...state,
            recording: RecordState.START
        })
    };

    const handleStop = () => {
        setState({
            ...state,
            recording: RecordState.STOP,
        });
    };

    const handleData = (audio) => {
        setState({
            ...state,
            audio: audio
        })
    };

    console.log(state);
    return(
        <>
        <Dialog maxWidth="lg" className="dialog-main" open={props.open || true}>
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{props.description}</DialogContentText>
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
                        variant="outlined"
                    >
                        <PlayCircleOutline style={{paddingRight: '3px'}} /> Start
                    </Button>
                    <Button
                        id="stop-btn"
                        onClick={handleStop}
                        variant="outlined"
                    >
                        <Stop style={{paddingRight: '3px'}} /> Stop
                    </Button>
                </div>
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
                    disabled={state.audio.length === 0}
                    color="primary"
                    variant="outlined"
                    onClick={handleSubmit}
                >
                    Analyze log
                </Button>
            </DialogActions>
        </Dialog>
        </>
    )

}

export default Audio;