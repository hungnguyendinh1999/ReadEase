import React, {FC} from 'react';
import './TextButton.css';

interface SingleLineTextButtonProps {
    onClick: () => void;
    text: string;
    height: number;
    width: number;
    indentation?: string;
    outlined? : boolean;
    textSize?: number;
    className?: string;
    inverseColor?: boolean;
}

const SingleLineTextButton: FC<SingleLineTextButtonProps> = ({onClick, text, height = 15, width = 30, indentation = "center", outlined = false, textSize = 20, className = "", inverseColor = false}) => {
    let backgroundClass = (inverseColor ? "inverse" : "normal") + (outlined ? "outline" : "");

    return (
        <div style={{height: height, width: width}} className={`text-button ${className} ${backgroundClass}`} onClick={onClick}>
            <a style={{textAlign: indentation, fontSize: textSize}}>{text}</a>
        </div>
    );
};

export default SingleLineTextButton;
