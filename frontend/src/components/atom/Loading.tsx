import React from "react";
import "./Loading.css"
import IconWhite from "../../assets/icon-white.png"
import Icon from "../../assets/icon.png"

interface LoadingProps {
    size: number;
    inverseColor?: boolean;
}

/**
 * Loading animation, using our logo
 * @author Khoa Nguyen
 *
 * @param size size of the loading icon
 */
const Loading: React.FC<LoadingProps> = ({size, inverseColor = false}) => {
    let icon = IconWhite;
    if (inverseColor) {
        icon = Icon;
    }

    return (
        <div id="loading-container" style={{height: size, width: size}}>
            <img src={icon} id="loading-img" />
        </div>
    );
};

export default Loading;