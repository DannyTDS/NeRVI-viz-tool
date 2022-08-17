import React from "react";

import "./Window.css";

const Window = (props) => {
    // const images = require.context('../../../data/vortex', true)
    // const image = require('../../../data/test/' + props.imagePath)
    const tag = props.type === "GT" ? "Ground Truth" : "Experiment Result";

    return (
        <div className="image-window">
            <img
                className="image"
                src={process.env.PUBLIC_URL + props.imagePath}
                alt="not found"
            />
            <p className="tag">{tag}</p>
        </div>
    );
};

export default Window;
