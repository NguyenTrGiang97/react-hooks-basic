import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

Clock.propTypes = {
    
};

function formatDate(nowD) {

    const hours = `0${nowD.getHours()}`.slice(-2);
    const minutes = `0${nowD.getMinutes()}`.slice(-2);
    const seconds = `0${nowD.getSeconds()}`.slice(-2);

    return `${hours}:${minutes}:${seconds}`;
}

function Clock() {
    const [timeString, SetTimeString] = useState('');

    useEffect(() => {
        const clockInterval = setInterval(() => {
            const now = new Date();
            const newTimeString = formatDate(now);

            SetTimeString(newTimeString);
        }, 1000);

        return () => {
            console.log('clock cleanup');
            clearInterval(clockInterval);
        }
    }, [])

    return (
        <div>
            <h2>{timeString}</h2>
        </div>
    );
}

export default Clock;