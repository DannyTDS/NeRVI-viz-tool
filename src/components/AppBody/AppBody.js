import React, { useState } from "react";
import ImageSection from "./ImageSection/ImageSection";
import SideBar from "./SideBar/SideBar";

import "./AppBody.css";

const AppBody = () => {
    const INIT_PARAMS = {
        dset: "Vortex",
        render: "IR",
        time_step: "3",
        theta: "45",
        phi: "90",
    };

    const [params, setParams] = useState(INIT_PARAMS);

    const paramsChangeHandler = (selectedParams) => {
        setParams(selectedParams);
    };

    return (
        <div className="app-body-container">
            <div id="image-sec-div">
                <ImageSection imageParams={params} />
            </div>
            <div id="sidebar-div">
                <SideBar
                    initialValues={INIT_PARAMS}
                    onParamsChange={paramsChangeHandler}
                />
            </div>
        </div>
    );
};

export default AppBody;
