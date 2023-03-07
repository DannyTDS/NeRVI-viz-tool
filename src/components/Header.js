import React, { useState } from "react";

import "./Header.css";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const onClickHandler = () => {
        setIsOpen(!isOpen);
    };

    const onBlurHandler = () => {
        setIsOpen(false);
    };

    return (
        <div className="header-frame">
            <div className="flex-wrapper">
                <p>NeRVI: Compressive Neural Representation of Visualization Images</p>
            </div>
            <div className="flex-wrapper">
                <span className={isOpen ? "show" : ""}>
                    Supervised by Professor Chaoli Wang
                    <br />
                    Project Led by Pengfei Gu
                    <br />
                    App Built by Ziang Tong
                </span>
                <i
                    className="fa fa-info-circle fa-2x"
                    id="info-icon"
                    onClick={onClickHandler}
                    onBlur={onBlurHandler}
                ></i>
            </div>
        </div>
    );
};

export default Header;
