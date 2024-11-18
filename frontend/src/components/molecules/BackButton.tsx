import React from "react";
import "../atom/Loading.css"
import BackIcon from "../../assets/back.png"
import IconButton from "../atom/IconButton";

interface BackButtonProps {
    size: number;
    onClick: () => void;
    inverseColor: boolean;
}

const BackButton: React.FC<BackButtonProps> = ({size, onClick = () => {}, inverseColor = false}) => {
    return (
        <IconButton onClick={onClick} iconSrc={BackIcon} size={size} iconSize={35} inverseColor={inverseColor}/>
    );
};

export default BackButton;