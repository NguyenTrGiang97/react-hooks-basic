import React, { useState, useEffect, useRef } from 'react';

function randomColor(currentColor) {
    const COLOR_LIST = ['red', 'green', 'blue', 'black', 'yellow']


    // trả về giá trị index trong mảng: 0, 1, 2..
    const currentIndex = COLOR_LIST.indexOf(currentColor);
    // gán 2 thg = nhau để lần tới currenIndex random tiếp
    let newIndex = currentIndex;
    while (currentIndex === newIndex) {
        newIndex = Math.trunc(Math.random() * 5);
    }

    return COLOR_LIST[newIndex];
}

function useMagicColor() {
    const [color, setColor] = useState('transparent');
    const colorRef = useRef('transparent');

    //change color every 1 second
    useEffect(() => {
        const colorInterVal = setInterval(() => {
            const newColor = randomColor(colorRef.current);
            setColor(newColor);

            colorRef.current = newColor;
        }, 1000);
        return () => {
            clearInterval(colorInterVal);
        }

    }, []);

    return color;
}

export default useMagicColor;