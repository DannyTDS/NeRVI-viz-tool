import React, { useState, useEffect } from "react";
import FilterSlider from "./FilterSlider";
import Dropdown from "./Dropdown";

import "./SideBar.css";

const SideBar = (props) => {

    const [selectedParams, setParams] = useState(props.initialValues)
    const [timeStepLimits, setTimeStepLimits] = useState(props.limits.time_step[props.initialValues.dset])
    
    const animOptions = ["None", "Time Step", "Theta", "Phi"]
    const [anim, setAnim] = useState(animOptions[0]);

    const formChangeHandler = (args) => {
        const {name, value} = args;
        // If switch to another dataset, need to reset the viewing parameters
        setParams(prevParams => ({
            ...prevParams,
            [name]: value
        }))
        if (name==="dset") {
            console.log(props.limits.time_step[value]);
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
            <p id="menu-label">Control Panel</p>
            <div className="divider">
                {/* <label id="dataset-label">Dataset</label> */}
                <Dropdown
                    title="Dataset"
                    selected={selectedParams.dset}
                    options={props.dsets}
                    onChangeHandler={(e) => {formChangeHandler(e)}}
                />
                <Dropdown 
                    title="Animation"
                    selected={anim}
                    options={animOptions}
                    onChangeHandler={(e) => {animHandler(e)}}
                />
                {/* <div className="btn-group">
                    <input
                        className="radio-input"
                        type="radio"
                        name="anim-opn-group"
                        id="none"
                        value="none"
                        disabled
                    />
                    <label className="radio-label" htmlFor="none">None</label>
                    <input
                        className="radio-input"
                        type="radio"
                        name="anim-opn-group"
                        id="ts"
                        value="ts"
                    />
                    <label className="radio-label" htmlFor="ts">Time Step</label>
                    <input
                        className="radio-input"
                        type="radio"
                        name="anim-opn-group"
                        id="theta"
                        value="theta"
                    />
                    <label className="radio-label" htmlFor="theta">Theta</label>
                    <input
                        className="radio-input"
                        type="radio"
                        name="anim-opn-group"
                        id="phi"
                        value="phi"
                    />
                    <label className="radio-label" htmlFor="phi">Phi</label>
                </div> */}
                <div style={{"position": "relative"}}>
                    <button id="anim-btn" onClick={playAnim}>
                        Play to End
                    </button>
                    <div id="spinner"></div>
                </div>
                <button id="reset-btn" onClick={resetViewing}>
                    Reset
                </button>
            </div>
            <div className="divider">
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
            </div>
        </div>
    );
};

export default SideBar;
