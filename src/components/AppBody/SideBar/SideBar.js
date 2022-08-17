import React, { useState } from "react";
import FilterSlider from "./FilterSlider";
import Dropdown from "./Dropdown";

import "./SideBar.css";

const SideBar = (props) => {
    const [selectedTimeStep, setSelectedTimeStep] = useState(
        props.initialValues.time_step
    );
    const [selectedIsoValue, setSelectedIsoValue] = useState(
        props.initialValues.iso_value
    );
    const [selectedTheta, setSelectedTheta] = useState(
        props.initialValues.theta
    );
    const [selectedPhi, setSelectedPhi] = useState(props.initialValues.phi);

    const timeStepChangeHandler = (e) => {
        setSelectedTimeStep(e.target.value);
        formChangeHandler();
    };

    const isoValueChangeHandler = (e) => {
        setSelectedIsoValue(e.target.value);
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
        const selectedParams = {
            time_step: selectedTimeStep,
            iso_value: selectedIsoValue,
            theta: selectedTheta,
            phi: selectedPhi,
        };
        props.onParamsChange(selectedParams);
    };

    const [selectedDataset, setSelectedDataset] = useState("Vortex");

    const resetHandler = () => {
      setSelectedTimeStep(props.initialValues.time_step);
      setSelectedIsoValue(props.initialValues.iso_value);
      setSelectedTheta(props.initialValues.theta);
      setSelectedPhi(props.initialValues.phi);
      setSelectedDataset("Vortex");
      props.onParamsChange(props.initialValues);
    };

    return (
        <div className="sidebar-wrapper">
            <p id="menu-label">Control Panel</p>
            <div className="divider">
                {/* <label id="dataset-label">Dataset</label> */}
                <Dropdown
                    selectedDataset={selectedDataset}
                    setSelectedDataset={setSelectedDataset}
                />
            </div>
            <div className="divider">
                <form>
                    <FilterSlider
                        title="Time Step"
                        min="3"
                        max="90"
                        step="3"
                        value={selectedTimeStep}
                        onChangeHandler={timeStepChangeHandler}
                    />
                    <FilterSlider
                        title="Iso Value"
                        min="-0.4"
                        max="0.4"
                        step="0.1"
                        value={selectedIsoValue}
                        onChangeHandler={isoValueChangeHandler}
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
                </form>
            </div>
            <button className="reset-button" onClick={resetHandler}>
                Reset to default
            </button>
        </div>
    );
};

export default SideBar;