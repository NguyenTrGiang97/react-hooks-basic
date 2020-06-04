import React from 'react';
import useClock from '../../hooks/useClock';

function Clock() {
    const {timeString} = useClock();

    return (
        <div>
            <h2>{timeString}</h2>
        </div>
    );
}

export default Clock;