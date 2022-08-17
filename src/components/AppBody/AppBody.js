import React, { useState } from "react";
import ImageSection from "./ImageSection/ImageSection";
import SideBar from "./SideBar/SideBar";

import "./AppBody.css";

const AppBody = () => {
    const INIT_PARAMS = {
        time_step: "3",
        iso_value: "0",
        theta: "45",
        phi: "90",
    };

    const [params, setParams] = useState(INIT_PARAMS);

    const paramsChangeHandler = (selectedParams) => {
        setParams(selectedParams);
    };

    return (
        <div className="app-body-container">
            <div className="image-div">
                <ImageSection imageParams={params} />
            </div>
            <div className="sidebar-div">
                <SideBar
                    initialValues={INIT_PARAMS}
                    onParamsChange={paramsChangeHandler}
                />
            </div>
        </div>
    );
};

export default AppBody;
