import React, { FC } from 'react';
import './IconButton.css';

interface IconButtonProps {
  label?: string;
  onClick: () => void;
  iconSrc: string;
  className?: string;
}

const IconButton: FC<IconButtonProps> = ({ label = '', onClick, iconSrc , className = ""}) => {
  return (
    <button className= {`icon-button ${className}`} onClick={onClick}>
      <img src={iconSrc} alt={`${label} Icon`} className="button-icon" />
      {label && <span className="button-label">{label}</span>}
    </button>
  );
};

export default IconButton;
