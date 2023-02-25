import React from "react";

import "./Window.css";

const Window = (props) => {
    // const images = require.context('../../../data/vortex', true)
    // const image = require('../../../data/test/' + props.imagePath)

    return (
        <div className="image-window">
            <img
                className="image"
                src={process.env.PUBLIC_URL + props.imagePath}
                alt="not found"
            />
        </div>
    );
};

export default Window;
