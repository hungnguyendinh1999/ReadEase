import React from "react";
import "./StyleToggleButton.css";

interface StyleToggleButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const StyleToggleButton: React.FC<StyleToggleButtonProps> = ({
  label,
  isActive,
  onClick,
}) => {
  return (
    <button
      className={`style-toggle-button ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default StyleToggleButton;