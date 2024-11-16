import React, {useState, useRef, useEffect} from "react";

interface ColorButtonProps {
    size: number;
    rgb: string;
    onClick: () => void;
}

const ColorButton: React.FC<ColorButtonProps> = ({size, rgb, onClick}) => {
    return (
        <div style={{backgroundColor: rgb, width: size, height: size}} className="button-img" onClick={onClick}>
        </div>
    );
};

export default ColorButton;