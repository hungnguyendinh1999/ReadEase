import React from "react";
import "./Loading.css"
import IconWhite from "../../assets/icon-white.png"

interface LoadingProps {
    size: number;
}

const Loading: React.FC<LoadingProps> = ({size}) => {
    return (
        <div id="loading-container" style={{height: size, width: size}}>
            <img src={IconWhite} id="loading-img" />
        </div>
    );
};

export default Loading;