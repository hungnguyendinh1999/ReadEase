import React from "react";
import "../atom/Loading.css"
import BackIcon from "../../assets/back.png"
import IconButton from "../atom/IconButton";

interface BackButtonProps {
    size: number;
    onClick: () => void;
    inverseColor: boolean;
}

/**
 * Button with back icon
 * @author Khoa Nguyen
 *
 * @param size size of the button
 * @param onClick function when click
 * @param inverseColor black background if true, otherwise white background
 * @constructor
 */
const BackButton: React.FC<BackButtonProps> = ({size, onClick = () => {}, inverseColor = false}) => {
    return (
        <IconButton onClick={onClick} iconSrc={BackIcon} size={size} iconSize={35} inverseColor={inverseColor}/>
    );
};

export default BackButton;