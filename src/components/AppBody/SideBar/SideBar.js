import React, { useState, useEffect } from "react";
import FilterSlider from "./FilterSlider";
import Dropdown from "./Dropdown";

import "./SideBar.css";

const SideBar = (props) => {

    const [selectedParams, setParams] = useState(props.initialValues)

    const formChangeHandler = (args) => {
        const {name, value} = args;
        setParams(prevParams => ({
        ...prevParams,
        [name]: value
        }))
    };

    useEffect(() => {
        console.log(selectedParams.render === "IR")
        if (selectedParams.render === "IR") {
            document.getElementById("ir").checked=true;
        } else {
            document.getElementById("dvr").checked=true;
        }
        props.onParamsChange(selectedParams);
    }, [selectedParams]);

    const resetHandler = () => {
        setParams(props.initialValues);
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
                    <label className="radio-label" for="ir">IR</label>
                    <input
                        className="radio-input"
                        type="radio"
                        name="render-opn-group"
                        id="dvr"
                        value="dvr"
                        onClick={() => {formChangeHandler({name:"render", value:"DVR"})}}
                    />
                    <label className="radio-label" for="dvr">DVR</label>
                </div>
                <button className="reset-button" onClick={resetHandler}>
                    Reset to default
                </button>
            </div>
            <div className="divider">
                <FilterSlider
                    title="Time Step"
                    min="3"
                    max="90"
                    step="3"
                    value={selectedParams.time_step}
                    onChangeHandler={(e) => {formChangeHandler(e)}}
                />
                <FilterSlider
                    title="Theta"
                    min="45"
                    max="120"
                    step="15"
                    value={selectedParams.theta}
                    onChangeHandler={(e) => {formChangeHandler(e)}}
                />
                <FilterSlider
                    title="Phi"
                    min="90"
                    max="225"
                    step="15"
                    value={selectedParams.phi}
                    onChangeHandler={(e) => {formChangeHandler(e)}}
                />
            </div>
        </div>
    );
};

export default SideBar;
