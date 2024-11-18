import React, {FC} from 'react';
import './TextButton.css';

interface DoubleLineTextButtonProps {
    onClick: () => void;
    headerText: string;
    descText: string;
    height: number;
    width: number;
    indentation?: string;
    outlined? : boolean;
    textSize?: number;
    className?: string;
    inverseColor?: boolean;
}

const DoubleLineTextButton: FC<DoubleLineTextButtonProps> = ({onClick, headerText, descText, height = 15, width = 30, indentation = "center", outlined = false, textSize = 20, className = "", inverseColor = false}) => {
    let backgroundClass = (inverseColor ? "inverse" : "normal") + (outlined ? "-outline" : "");

    return (
        <div style={{height: height, width: width}} className={`text-button ${className} ${backgroundClass}`}
             onClick={onClick}>
            <a style={{textAlign: indentation, fontSize: textSize + 10}}>{headerText}</a>
            <a style={{textAlign: indentation, fontSize: textSize, fontWeight: "normal"}}>{descText}</a>
        </div>
    );
};

export default DoubleLineTextButton;
