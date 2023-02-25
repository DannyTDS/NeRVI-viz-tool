import React, { useState } from "react";
import "./Dropdown.css";

const Dropdown = (props) => {
    const [isActive, setIsActive] = useState(false);

    const options = ["Vortex", "Five Jets", "Ionization", "Tornado", "Tangaroa"];

    const onBtnClickHandler = () => {
        setIsActive(!isActive);
    };

    const onItemClickHandler = (e) => {
        props.setSelectedDataset(e.target.textContent);
        setIsActive(!isActive);
    };

    return (
        <div className="dropdown">
            <div className="dropdown-btn" onClick={onBtnClickHandler}>
                {props.selectedDataset}
                <i className="fa fa-caret-down"></i>
            </div>
            {isActive && (
                <div className="dropdown-content">
                    {options.map((option) => (
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
    );
};

export default Dropdown;
