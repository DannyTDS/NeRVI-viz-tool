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
        const offset = (value - props.min) / (props.max - props.min);
        document.getElementById("slider-tooltip"+props.id).style.left = offset*100 + "%";
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
                <label className="slider-title">{props.title + " - " + toolTipValue}</label>
            </div>
            <div className="slider-wrapper">
                <div className="range-container">
                    <div className="left-value">{props.min}</div>
                    <div className="range-wrapper">
                        <div className="slider-tooltip" id={"slider-tooltip" + props.id}>
                            <span className={isMoving ? "show" : ""}>
                                {toolTipValue}
                            </span>
                        </div>
                        <input
                            type="range"
                            min={props.min}
                            max={props.max}
                            step={props.step}
                            value={props.value}
                            // onChange={props.onChangeHandler}
                            onInput={onChangeHandler}
                            onBlur={onBlurHandler}
                            disabled={props.min===props.max}
                        />
                    </div>
                    <div className="right-value">{props.max}</div>
                </div>
            </div>
        </div>
    );
};

export default FilterSlider;
