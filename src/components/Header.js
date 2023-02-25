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
            <h1>NeRVI: Compressive Neural Representation of Visualization Images</h1>
            <i
                className="fa fa-info-circle fa-2x"
                id="info-icon"
                onClick={onClickHandler}
                onBlur={onBlurHandler}
            ></i>
            <span className={isOpen ? "show" : ""}>
                Supervised by Professor Chaoli Wang
                <br />
                Project Led by Pengfei Gu
                <br />
                App Built by Ziang Tong
            </span>
        </div>
    );
};

export default Header;
