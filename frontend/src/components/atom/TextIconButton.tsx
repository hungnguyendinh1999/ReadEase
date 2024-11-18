import React, {FC} from 'react';
import './TextIconButton.css';

interface IconButtonProps {
    label?: string;
    onClick: () => void;
    iconSrc: string;
    className?: string;
    inverseColor?: boolean;
}

/**
 * Button with icon and text
 * @author Hung Nguyen
 * @author Khoa Nguyen
 *
 * @param label text to display
 * @param onClick function when click
 * @param iconSrc source icon of the button
 * @param className additional class name
 * @param inverseColor black background if true, otherwise white background
 */
const TextIconButton: FC<IconButtonProps> = ({label = '', onClick, iconSrc, className = "", inverseColor = false}) => {
    return (
        <button className={`icon-button ${className} ${inverseColor ? "button-hover-inverse" : "button-hover-normal"}`} onClick={onClick}>
            <img src={iconSrc} alt={`${label} Icon`} className="button-icon"/>
            {label && <span className="button-label" style={inverseColor ? {color: "#F5F5F5"} : {color: "#333333"}}>{label}</span>}
        </button>
    );
};

export default TextIconButton;
