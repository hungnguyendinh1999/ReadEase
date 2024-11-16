import React from "react";
import ColorButton from "../components/ColorButton";

interface ColorSelectBarProps {
    width: number;
    colors: string[];
    callback: (color: string) => void;
}

const ColorSelectBar: React.FC<ColorSelectBarProps> = ({width, colors, callback}) => {
    const onColorClick = (color: string) => {
        callback(color);
    }

    return (
        <div id="color-bar" style={{width: width, display: "flex", alignItems: "center"}}>
            {colors.map((color, index) => (
                <ColorButton key={"color-btn-" + index} size={30} rgb={color} onClick={() => onColorClick(color)}/>
            ))}
        </div>
    );
};

export default ColorSelectBar;