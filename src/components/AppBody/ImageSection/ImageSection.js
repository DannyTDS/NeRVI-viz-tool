import React from "react";

import "./ImageSection.css";

const ImageSection = (props) => {
    const ROOT = "/data";

    const img_dirs = ["IR", "DVR"].map((mode) => (
      ROOT +
        "/" +
        props.params.dset +
        "/" +
        mode +
        "/" +
        props.params.time_step +
        "-" +
        props.params.theta +
        "-" +
        props.params.phi +
        ".png"
    ));

    return (
        <div className="wrapper">
            {/* <div className="ratio-wrapper">
        <Window
          className="image-window"
          imagePath="/src/data/vortex/ground-truth/save-timestep-3-iso--0.100000-theta-45.000000-phi-90.000000.png"
        />
      </div>
      <div className="ratio-wrapper">
        <Window className="image-window" />
      </div> */}
            <div className="window-wrapper">
              <div className="window"><img
                    className="image"
                    src={process.env.PUBLIC_URL + img_dirs[0]}
                    alt="not found"
                /></div>
                    
            </div>
            <div className="window-wrapper">
              <div className="window"><img
                    className="image"
                    src={process.env.PUBLIC_URL + img_dirs[1]}
                    alt="not found"
                /></div>
            </div>
        </div>
    );
};

export default ImageSection;
