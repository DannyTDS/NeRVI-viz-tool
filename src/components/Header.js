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
                <div className="flex"><p>NeRVI: Compressive Neural Representation of Visualization Images</p></div>
                <div className="flex">
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
                    <br />
                    &copy; 2023. Made with React.js 18.1.0
                </span>
            </div>
        </div>
    );
};

export default Header;
