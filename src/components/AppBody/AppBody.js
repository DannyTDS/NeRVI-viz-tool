import React, { useState } from "react";
import ImageSection from "./ImageSection/ImageSection";
import SideBar from "./SideBar/SideBar";

import "./AppBody.css";

const AppBody = () => {
    const DSETS = ["Vortex", "Ionization", "Tornado", "Five Jets", "Tangaroa"];

    const DSET_LIMITS = {
        theta: [0, 171, 9],
        phi: [0, 351, 9],
        time_step: {
            Vortex: [3, 90, 3],
            Ionization: [2, 100, 2],
            Tornado: [1, 48, 1],
            "Five Jets": [1991, 1991, 0],
            Tangaroa: [196, 196, 0]
        }
    }

    const INIT_PARAMS = {
        dset: "Vortex",
        mode: "DVR",
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
                <ImageSection params={params} />
            </div>
            <div className="vl"/>
            <div id="sidebar-div">
                <SideBar
                    limits={DSET_LIMITS}
                    dsets={DSETS}
                    initialValues={INIT_PARAMS}
                    onParamsChange={paramsChangeHandler}
                />
            </div>
        </div>
    );
};

export default AppBody;
