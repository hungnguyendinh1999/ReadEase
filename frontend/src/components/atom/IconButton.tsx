import React, {FC} from 'react';
import './IconButton.css';

interface IconButtonProps {
    label?: string;
    onClick: () => void;
    iconSrc: string;
    className?: string;
    inverseColor?: boolean;
}

const IconButton: FC<IconButtonProps> = ({label = '', onClick, iconSrc, className = "", inverseColor = false}) => {
    return (
        <button className={`icon-button ${className}`} onClick={onClick}>
            <img src={iconSrc} alt={`${label} Icon`} className="button-icon"/>
            {label && <span className="button-label" style={inverseColor ? {color: "#F5F5F5"} : {color: "#333333"}}>{label}</span>}
        </button>
    );
};

export default IconButton;
