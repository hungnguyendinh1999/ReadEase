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
