import React, { useState } from "react";
import FilterSlider from "./FilterSlider";
import Dropdown from "./Dropdown";

import "./SideBar.css";

const SideBar = (props) => {
    const [selectedDataset, setSelectedDataset] = useState(props.initialValues.dset);

    const [selectedRender, setSelectedRender] = useState(props.initialValues.render);

    const [selectedTimeStep, setSelectedTimeStep] = useState(
        props.initialValues.time_step
    );
    const [selectedTheta, setSelectedTheta] = useState(
        props.initialValues.theta
    );
    const [selectedPhi, setSelectedPhi] = useState(props.initialValues.phi);

    const dsetChangeHandler = (e) => {
        setSelectedDataset(e.target.textContent);
        formChangeHandler();
    }

    const renderChangeHandler = (mode) => {
        setSelectedRender(mode);
        formChangeHandler();
    }

    const timeStepChangeHandler = (e) => {
        setSelectedTimeStep(e.target.value);
        formChangeHandler();
    };

    const thetaChangeHandler = (e) => {
        setSelectedTheta(e.target.value);
        formChangeHandler();
    };

    const phiChangeHandler = (e) => {
        setSelectedPhi(e.target.value);
        formChangeHandler();
    };

    const formChangeHandler = () => {
        // FIXME not updating immeidately
        const selectedParams = {
            dset: selectedDataset,
            render: selectedRender,
            time_step: selectedTimeStep,
            theta: selectedTheta,
            phi: selectedPhi,
        };
        // console.log(selectedParams);
        props.onParamsChange(selectedParams);
    };

    const resetHandler = () => {
        // FIXME reset logic
        setSelectedDataset("Vortex");
        setSelectedRender("IR")
        setSelectedTimeStep(props.initialValues.time_step);
        setSelectedTheta(props.initialValues.theta);
        setSelectedPhi(props.initialValues.phi);
        props.onParamsChange(props.initialValues);
    };

    return (
        <div className="sidebar-wrapper">
            <p id="menu-label">Control Panel</p>
            <div className="divider">
                {/* <label id="dataset-label">Dataset</label> */}
                <Dropdown
                    selectedDataset={selectedDataset}
                    onChangeHandler={dsetChangeHandler}
                />
                <div className="btn-group">
                    <input
                        className="radio-input"
                        type="radio"
                        name="render-opn-group"
                        id="ir"
                        value="ir"
                        checked
                        onChange={(e) => {renderChangeHandler("IR")}}
                    />
                    <label className="radio-label" for="ir">IR</label>
                    <input
                        className="radio-input"
                        type="radio"
                        name="render-opn-group"
                        id="dvr"
                        value="dvr"
                        onChange={(e) => {renderChangeHandler("DVR")}}
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
                    value={selectedTimeStep}
                    onChangeHandler={timeStepChangeHandler}
                />
                <FilterSlider
                    title="Theta"
                    min="45"
                    max="120"
                    step="15"
                    value={selectedTheta}
                    onChangeHandler={thetaChangeHandler}
                />
                <FilterSlider
                    title="Phi"
                    min="90"
                    max="225"
                    step="15"
                    value={selectedPhi}
                    onChangeHandler={phiChangeHandler}
                />
            </div>
        </div>
    );
};

export default SideBar;
