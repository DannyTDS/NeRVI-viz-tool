import React, { useState } from "react";
import "./Dropdown.css";

const Dropdown = (props) => {
    const [isActive, setIsActive] = useState(false);

    const onBtnClickHandler = () => {
        setIsActive(!isActive);
    };

    const onItemClickHandler = (e) => {
        props.onChangeHandler({
            name: (props.title === "Data Set") ? "dset": "anim",
            value: e.target.textContent
        });
        setIsActive(!isActive);
    };

    return (
        <div className="wrapper">
            <div><label className="dropdown-title">{props.title}</label></div>
            <div className="dropdown">
                <div className="dropdown-btn" onClick={onBtnClickHandler}>
                    {props.selected}
                    <i className="fa fa-caret-down"></i>
                </div>
                {isActive && (
                    <div className="dropdown-content">
                        {props.options.map((option) => (
                            <div
                                className="dropdown-item"
                                onClick={onItemClickHandler}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dropdown;
