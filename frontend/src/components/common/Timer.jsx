import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const Timer = ({ initialTime, onTimeUp, isRunning: externalIsRunning }) => {
    const [timeRemaining, setTimeRemaining] = useState(initialTime);
    const [isRunning, setIsRunning] = useState(externalIsRunning || false);

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        setIsRunning(externalIsRunning);
    }, [externalIsRunning]);

    useEffect(() => {
        let interval = null;
        if (isRunning && timeRemaining > 0) {
            interval = setInterval(() => {
                setTimeRemaining((prev) => {
                    const newTime = prev - 1;
                    if (newTime <= 0 && onTimeUp) {
                        onTimeUp();
                    }
                    return newTime;
                });
            }, 1000);
        } else if (timeRemaining === 0) {
            setIsRunning(false);
        }
        return () => clearInterval(interval);
    }, [isRunning, timeRemaining, onTimeUp]);

    const isWarning = timeRemaining < 300; // Less than 5 minutes
    const isDanger = timeRemaining < 60; // Less than 1 minute

    return (
        <div className={`timer-container ${isDanger ? 'timer-danger' : isWarning ? 'timer-warning' : ''}`}>
            <span className="timer-icon">⏱️</span>
            <span className="timer-display">{formatTime(timeRemaining)}</span>
        </div>
    );
};

Timer.propTypes = {
    initialTime: PropTypes.number.isRequired,
    onTimeUp: PropTypes.func,
    isRunning: PropTypes.bool,
};

Timer.defaultProps = {
    onTimeUp: () => { },
    isRunning: false,
};

export default Timer;