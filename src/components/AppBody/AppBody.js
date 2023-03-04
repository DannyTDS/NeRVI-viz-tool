import React, { useState } from "react";
import ImageSection from "./ImageSection/ImageSection";
import SideBar from "./SideBar/SideBar";

import "./AppBody.css";

const AppBody = () => {
    const DSET_LIMITS = {
        theta: [0, 180, 9],
        phi: [0, 360, 9],
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
        render: "IR",
        time_step: "3",
        theta: "45",
        phi: "90",
    };

    const [params, setParams] = useState(INIT_PARAMS);

    const paramsChangeHandler = (selectedParams) => {
        const new_theta=(selectedParams.theta==="180") ? "0" : selectedParams.theta;
        const new_phi=(selectedParams.phi==="360") ? "0" : selectedParams.phi;
        setParams({
            ...selectedParams,
            theta: new_theta,
            phi: new_phi
        });
    };

    return (
        <div className="app-body-container">
            <div id="image-sec-div">
                <ImageSection params={params} />
            </div>
            <div id="sidebar-div">
                <SideBar
                    limits={DSET_LIMITS}
                    initialValues={INIT_PARAMS}
                    onParamsChange={paramsChangeHandler}
                />
            </div>
        </div>
    );
};

export default AppBody;
