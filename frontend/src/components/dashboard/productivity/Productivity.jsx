import React, { useState, useRef } from 'react';

// custom components
import Audio from "../audio/Audio";
import CheckDialog from "./CheckDialog";

// styling
import './Productivity.css';

// material components
import {
    Button,
} from "@material-ui/core"

// material icons
import {
    PlayCircleOutline,
    PauseCircleOutline,
    Stop
} from "@material-ui/icons";

function Productivity(props) {
    const [timer, setTimer] = useState(0);
    const [state, setState] = useState({
        isActive: false,
        isPaused: false,
        isStopped: false,
        openAudio: false,
        openCheck: false,
    });
    const increment = useRef(null);

    const handleAudioOpen = () => setState({...state, openAudio: true});

    const handleAudioClose = () => setState({...state, openAudio: false});

    const handleCheckOpen = () => {
        clearInterval(increment.current);
        setState({
            ...state,
            isPaused: true,
            openCheck: true
        });
    };

    const handleCheckClose = () => setState({...state, openCheck: false});

    const handleStart = () => {
        setState({
            ...state,
            isActive: true,
            isPaused: false,
        });
        increment.current = setInterval(() => {
            setTimer((timer) => timer + 1)
        }, 1000)
    };

    const handlePause = () => {
        clearInterval(increment.current);
        setState({
            ...state,
            isPaused: true,
        })
    };

    const handleReset = () => {
        clearInterval(increment.current);
        setState({
            ...state,
            isActive: true,
            isPaused: true,
        });
        setTimer(0)
    };

    const formatTime = () => {
        const getSeconds = `0${(timer % 60)}`.slice(-2);
        const minutes = `${Math.floor(timer / 60)}`;
        const getMinutes = `0${minutes % 60}`.slice(-2);
        const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

        return `${getHours} : ${getMinutes} : ${getSeconds}`
    };

    const formatTimeToRemove = () => {
        const hours = timer / 3600;
        return Math.round(hours / 10) * 10
    };

    return (
        <>
        <Audio
            open={state.openAudio}
            handleClose={handleAudioClose}
            handleCheckClose={handleCheckClose}
        />
        <CheckDialog
            time={formatTimeToRemove()}
            open={state.openCheck}
            handleClose={handleCheckClose}
            handleOpen={handleAudioOpen}
            handleReset={handleReset}
        />
       <div className="main-timer">
           <h1 className="timer-text">{formatTime()}</h1>
           <div>
               <Button
                   id="start-btn"
                   onClick={handleStart}
                   variant="outlined"
               >
                   <PlayCircleOutline style={{paddingRight: '3px'}} /> Start
               </Button>
               <Button
                   id="pause-btn"
                   onClick={handlePause}
                   variant="outlined"
               >
                   <PauseCircleOutline style={{paddingRight: '3px'}} /> Pause
               </Button>
               <Button
                   id="stop-btn"
                   onClick={handleCheckOpen}
                   variant="outlined"
               >
                   <Stop style={{paddingRight: '3px'}} /> Stop
               </Button>
           </div>
       </div>
        </>
    )

}

export default Productivity;