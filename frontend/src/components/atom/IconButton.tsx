import React, {FC} from 'react';
import './IconButton.css';

interface IconButtonProps {
    onClick: () => void;
    iconSrc: string;
    size?: number;
    iconSize?: number;
    isCircular?: boolean;
    className?: string;
    inverseColor?: boolean;
}

/**
 * Button with a single icon in the center
 * @author Khoa Nguyen
 *
 * @param onClick function when click
 * @param iconSrc source image for icon
 * @param size size of the button
 * @param iconSize size of the icon
 * @param isCircular circle button if true, otherwise squared button
 * @param className additional class name
 * @param inverseColor black background if true, otherwise white background
 */
const IconButton: FC<IconButtonProps> = ({onClick, iconSrc, size = 30, iconSize = 50, isCircular = true, className = "", inverseColor = false}) => {
    let backgroundClass = inverseColor ? "inverse" : "normal";
    let borderRadius = isCircular ? "50%" : "10%";

    return (
        <button style={{height: size, width: size, borderRadius: borderRadius}} className={`button-img ${className} ${backgroundClass}`} onClick={onClick}>
            <img style={{height: iconSize + "%"}} src={iconSrc}/>
        </button>
    );
};

export default IconButton;
