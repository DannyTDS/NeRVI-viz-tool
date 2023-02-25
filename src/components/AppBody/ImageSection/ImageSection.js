import React from "react";
import Window from "./Window";

import "./ImageSection.css";

const ImageSection = (props) => {
    const IMAGES_DIR = "/data/vortex";

    let parsedIsoValue = props.imageParams.iso_value;

    if (props.imageParams.iso_value === "0") {
        parsedIsoValue = "0.000000";
    } else {
        parsedIsoValue += "00000";
    }

    const gt_dir =
        IMAGES_DIR +
        "/ground-truth/save-timestep-" +
        props.imageParams.time_step +
        "-iso-" +
        parsedIsoValue +
        "-theta-" +
        props.imageParams.theta +
        ".000000-phi-" +
        props.imageParams.phi +
        ".000000.png";
    const exp_dir =
        IMAGES_DIR +
        "/exp-results/save-timestep-" +
        props.imageParams.time_step +
        "-iso-" +
        parsedIsoValue +
        "-theta-" +
        props.imageParams.theta +
        ".000000-phi-" +
        props.imageParams.phi +
        ".000000.png";

    return (
        <div className="windows-wrapper">
            {/* <div className="ratio-wrapper">
        <Window
          className="image-window"
          imagePath="/src/data/vortex/ground-truth/save-timestep-3-iso--0.100000-theta-45.000000-phi-90.000000.png"
        />
      </div>
      <div className="ratio-wrapper">
        <Window className="image-window" />
      </div> */}
            {/* <Window type="EXP" imagePath={exp_dir} /> */}
            <Window type="GT" imagePath={gt_dir} />
        </div>
    );
};

export default ImageSection;
