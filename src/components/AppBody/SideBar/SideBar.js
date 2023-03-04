import React, { useState, useEffect } from "react";
import FilterSlider from "./FilterSlider";
import Dropdown from "./Dropdown";

import "./SideBar.css";

const SideBar = (props) => {

    const [selectedParams, setParams] = useState(props.initialValues)
    const [timeStepLimits, setTimeStepLimits] = useState(props.limits.time_step[props.initialValues.dset])

    const formChangeHandler = (args) => {
        const {name, value} = args;
        // If switch to another dataset, need to reset the viewing parameters
        setParams(prevParams => ({
            ...prevParams,
            [name]: value
        }))
        if (name==="dset") {
            setTimeStepLimits(props.limits.time_step[value]);
            resetViewing();
        }
    };

    useEffect(() => {
        // console.log(selectedParams)
        // Pass selected params upwards
        props.onParamsChange(selectedParams);

        // Update radio buttons
        if (selectedParams.render === "IR") {
            document.getElementById("ir").checked=true;
        } else {
            document.getElementById("dvr").checked=true;
        }
    }, [selectedParams]);

    const resetViewing = () => {
        // Reset the viewing parameters
        setParams(prevParams => ({
            ...prevParams,
            time_step: props.limits.time_step[prevParams.dset][0],
            theta: props.limits.theta[0],
            phi: props.limits.phi[0]
        }))
    };

    return (
        <div className="sidebar-wrapper">
            <p id="menu-label">Control Panel</p>
            <div className="divider">
                {/* <label id="dataset-label">Dataset</label> */}
                <Dropdown
                    selectedDataset={selectedParams.dset}
                    onChangeHandler={(e) => {formChangeHandler(e)}}
                />
                <div className="btn-group">
                    <input
                        className="radio-input"
                        type="radio"
                        name="render-opn-group"
                        id="ir"
                        value="ir"
                        onClick={() => {formChangeHandler({name:"render", value:"IR"})}}
                    />
                    <label className="radio-label" htmlFor="ir">IR</label>
                    <input
                        className="radio-input"
                        type="radio"
                        name="render-opn-group"
                        id="dvr"
                        value="dvr"
                        onClick={() => {formChangeHandler({name:"render", value:"DVR"})}}
                    />
                    <label className="radio-label" htmlFor="dvr">DVR</label>
                </div>
                <button className="reset-button" onClick={resetViewing}>
                    Reset
                </button>
            </div>
            <div className="divider">
                <FilterSlider
                    title="Time Step"
                    min={timeStepLimits[0]}
                    max={timeStepLimits[1]}
                    step={timeStepLimits[2]}
                    value={selectedParams.time_step}
                    onChangeHandler={(e) => {formChangeHandler(e)}}
                />
                <FilterSlider
                    title="Theta"
                    min={props.limits.theta[0]}
                    max={props.limits.theta[1]}
                    step={props.limits.theta[2]}
                    value={selectedParams.theta}
                    onChangeHandler={(e) => {formChangeHandler(e)}}
                />
                <FilterSlider
                    title="Phi"
                    min={props.limits.phi[0]}
                    max={props.limits.phi[1]}
                    step={props.limits.phi[2]}
                    value={selectedParams.phi}
                    onChangeHandler={(e) => {formChangeHandler(e)}}
                />
            </div>
        </div>
    );
};

export default SideBar;
