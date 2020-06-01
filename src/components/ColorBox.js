import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ColorBox.scss';

ColorBox.propTypes = {

};

function getRandomColor() {
    const COLOR_LIST = ['deeppink', 'green', 'blue', 'black', 'red'];
    const randomIndex = Math.trunc(Math.random() * 5);
    return COLOR_LIST[randomIndex];
}

function ColorBox() {
    // Khởi tạo giá trị mặc định cho state color
    // sử dụng setColor để thay đổi color 
    const [color, setColor] = useState(() => {
        const initColor = localStorage.getItem('box_color') || 'deeppink';
        console.log(initColor);
        return initColor;
    });

    function handleBoxClick() {
        // get random color => setColor
        const newColor = getRandomColor();
        setColor(newColor);

        localStorage.setItem('box_color', newColor);
    }

    return (
        <div
            className="color-box"
            style={{ backgroundColor: color }}
            onClick={handleBoxClick}
        >
        </div>
    );
}

export default ColorBox;