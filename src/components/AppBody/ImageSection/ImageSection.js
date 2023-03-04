import React from "react";
import Window from "./Window";

import "./ImageSection.css";

const ImageSection = (props) => {
    const ROOT = "/data";

    const img_dir =
        ROOT +
        "/" + props.params.dset +
        "/" + props.params.render +
        "/" + props.params.time_step +
        "-" + props.params.theta +
        "-" + props.params.phi +
        ".png";

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
            <Window imagePath={img_dir} />
        </div>
    );
};

export default ImageSection;
