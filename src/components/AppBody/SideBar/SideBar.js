import React, { useState, useEffect } from "react";
import FilterSlider from "./FilterSlider";
import Dropdown from "./Dropdown";

import "./SideBar.css";

const SideBar = (props) => {

    const [selectedParams, setParams] = useState(props.initialValues)
    const [timeStepLimits, setTimeStepLimits] = useState(props.limits.time_step[props.initialValues.dset])

    const animOptions = ["None", "Time Step", "Theta", "Phi"];
    const [anim, setAnim] = useState(animOptions[0]);

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

    const animHandler = (args) => {
        setAnim(args.value);
    }

    useEffect(() => {
        // Pass selected params upwards
        // console.log(selectedParams);
        props.onParamsChange(selectedParams);
    }, [selectedParams]);

    useEffect(() => {
        if (anim === "None"){
            document.getElementById("anim-btn").disabled = true;
        } else {
            const name = (anim === "Time Step") ? "time_step" : (anim === "Theta") ? "theta" : "phi";
            const max = (name === "time_step") ? timeStepLimits[1] : (name === "theta") ? props.limits.theta[1] : props.limits.phi[1];
            document.getElementById("anim-btn").disabled = (parseInt(selectedParams[name]) === max);
        }
    }, [selectedParams, anim])

    const resetViewing = () => {
        // Reset the viewing parameters
        setParams(prevParams => ({
            ...prevParams,
            time_step: props.limits.time_step[prevParams.dset][0],
            theta: props.limits.theta[0],
            phi: props.limits.phi[0]
        }))
    };

    const sleep = (ms) => {
        return new Promise((resolve) => {setTimeout(resolve, ms)})
    }

    const playAnim = async () => {
        const btn = document.getElementById("anim-btn");
        btn.classList.add("hold");
        // btn.style.color = "#FFF"
        // btn.style.background = "#404040";

        document.getElementById("reset-btn").disabled = true;
        document.getElementById("spinner").style.opacity = "1";
        
        const name = (anim === "Time Step") ? "time_step" : (anim === "Theta") ? "theta" : "phi";
        const max = (name === "time_step") ? timeStepLimits[1] : (name === "theta") ? props.limits.theta[1] : props.limits.phi[1];
        const step = (name === "time_step") ? timeStepLimits[2] : (name === "theta") ? props.limits.theta[2] : props.limits.phi[2];
        
        for (let i=parseInt(selectedParams[name])+step; i<=max; i+=step){
            await sleep(100);
            formChangeHandler({"name":name, "value":i});
        }

        // btn.style.color = "#000"
        // btn.style.background = "#FFF";
        // btn.disabled = true;
        btn.classList.remove("hold");

        document.getElementById("reset-btn").disabled = false;
        document.getElementById("spinner").style.opacity = "0";
    }

    return (
        <div className="sidebar-wrapper">
                {/* <label id="dataset-label">Dataset</label> */}
                <Dropdown
                    title="Data Set"
                    selected={selectedParams.dset}
                    options={props.dsets}
                    onChangeHandler={(e) => {formChangeHandler(e)}}
                />
                <div style={{"margin" : "20px auto 0 auto"}}><label style={{"fontSize" : "1.2em"}}>Render Mode</label>
                <div className="btn-group">
                    <input
                        className="radio-input"
                        type="radio"
                        name="anim-opn-group"
                        id="IR"
                        value="IR"
                        checked={selectedParams.mode === "IR"}
                        onChange={() => formChangeHandler({name: "mode", value: "IR"})}
                    />
                    <label className="radio-label" htmlFor="IR">IR</label>
                    <input
                        className="radio-input"
                        type="radio"
                        name="anim-opn-group"
                        id="DVR"
                        value="DVR"
                        checked={selectedParams.mode === "DVR"}
                        onChange={() => formChangeHandler({name: "mode", value: "DVR"})}
                    />
                    <label className="radio-label" htmlFor="DVR">DVR</label>
                </div>
                </div>
                <FilterSlider
                    id="1"
                    title="Time Step"
                    min={timeStepLimits[0]}
                    max={timeStepLimits[1]}
                    step={timeStepLimits[2]}
                    value={selectedParams.time_step}
                    onChangeHandler={(e) => {formChangeHandler(e)}}
                />
                <FilterSlider
                    id="2"
                    title="Theta"
                    min={props.limits.theta[0]}
                    max={props.limits.theta[1]}
                    step={props.limits.theta[2]}
                    value={selectedParams.theta}
                    onChangeHandler={(e) => {formChangeHandler(e)}}
                />
                <FilterSlider
                    id="3"
                    title="Phi"
                    min={props.limits.phi[0]}
                    max={props.limits.phi[1]}
                    step={props.limits.phi[2]}
                    value={selectedParams.phi}
                    onChangeHandler={(e) => {formChangeHandler(e)}}
                />
                <Dropdown 
                    title="Animation"
                    selected={anim}
                    options={animOptions}
                    onChangeHandler={(e) => {animHandler(e)}}
                />
                <div style={{"position": "relative"}}>
                    <button id="anim-btn" onClick={playAnim}>
                        Play
                    </button>
                    <div id="spinner"></div>
                </div>
                <button id="reset-btn" onClick={resetViewing}>
                    Reset
                </button>
            </div>
    );
};

export default SideBar;
