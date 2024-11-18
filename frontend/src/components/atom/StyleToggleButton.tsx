import React from "react";
import "./StyleToggleButton.css";

interface StyleToggleButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

/**
 * A button component that toggles styles based on its active state.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {string} props.label - The label to be displayed on the button.
 * @param {boolean} props.isActive - The active state of the button.
 * @param {function} props.onClick - The function to be called when the button is clicked.
 * @returns {JSX.Element} The rendered button component.
 */
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