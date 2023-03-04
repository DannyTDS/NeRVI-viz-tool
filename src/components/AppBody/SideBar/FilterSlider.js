import React, { useState } from "react";

import "./FilterSlider.css";

const FilterSlider = (props) => {
    const [toolTipValue, setTooltipValue] = useState(props.value);
    const [isMoving, setIsMoving] = useState(false);
    // const [toolTipOffset, setTooltipOffset] = useState("0%");
    const onChangeHandler = (e) => {
        const name = (props.title === "Time Step") ? "time_step" : (props.title === "Theta") ? "theta" : "phi"
        const value = e.target.value;
        setTooltipValue(value);
        setIsMoving(true);
        // setTooltipOffset((toolTipValue - props.min)/(props.max - props.min)*100 + "%");
        props.onChangeHandler({name:name, value:value});
    };

    const onBlurHandler = () => {
        setIsMoving(false);
    };

    // const toolTipStyle = {
    //   left: toolTipOffset
    // };

    return (
        <div className="filter-container">
            <div>
                <label className="slider-title">{props.title}</label>
            </div>
            <div className="slider-wrapper">
                <div className="slider-tooltip">
                    <span className={isMoving ? "show" : ""}>
                        {toolTipValue}
                    </span>
                </div>
                <div className="range-container">
                    <div className="left-value">{props.min}</div>
                    <input
                        type="range"
                        min={props.min}
                        max={props.max}
                        step={props.step}
                        value={props.value}
                        // onChange={props.onChangeHandler}
                        onInput={onChangeHandler}
                        onBlur={onBlurHandler}
                    />
                    <div className="right-value">{props.max}</div>
                </div>
            </div>
        </div>
    );
};

export default FilterSlider;
