import React, { useState, useRef } from 'react';

// custom components
import Audio from "../audio/Audio";

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
    });
    const increment = useRef(null);

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

    return (
        <>
        <Audio

        />
       <div className="main-timer">
           <h1 className="timer-text">{formatTime()}</h1>
           <div>
               <Button
                   id="start-btn"
                   disabled={!state.isPaused}
                   onClick={handleStart}
                   variant="outlined"
               >
                   <PlayCircleOutline style={{paddingRight: '3px'}} /> Start
               </Button>
               <Button
                   id="pause-btn"
                   disabled={!state.isActive || state.isPaused}
                   onClick={handlePause}
                   variant="outlined"
               >
                   <PauseCircleOutline style={{paddingRight: '3px'}} /> Pause
               </Button>
               <Button
                   id="stop-btn"
                   disabled={!state.isActive}
                   onClick={handleReset}
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