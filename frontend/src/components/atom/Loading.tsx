import React from "react";
import "./Loading.css"
import IconWhite from "../../assets/icon-white.png"

interface LoadingProps {
    size: number;
}

/**
 * Loading animation, using our logo
 * @author Khoa Nguyen
 *
 * @param size size of the loading icon
 */
const Loading: React.FC<LoadingProps> = ({size}) => {
    return (
        <div id="loading-container" style={{height: size, width: size}}>
            <img src={IconWhite} id="loading-img" />
        </div>
    );
};

export default Loading;