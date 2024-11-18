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

/**
 * Two lined button, with a header and subtext
 * @author Khoa Nguyen
 *
 * @param onClick function when click
 * @param headerText text to display on header
 * @param descText text to display on subtext
 * @param height height of the button
 * @param width width of the button
 * @param indentation text alignment
 * @param outlined if the button is an outlined button, or a filled button
 * @param textSize size of texts
 * @param className additional class name
 * @param inverseColor black background if true, otherwise white
 */
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
