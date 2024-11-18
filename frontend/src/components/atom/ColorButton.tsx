import React from "react";

interface ColorButtonProps {
    color: string;
    isSelected: boolean;
    onClick: () => void;
  }
  

/**
 * ColorButton component renders a button with a specified color.
 * The button can be selected or unselected, indicated by a border style.
 * 
 * @param {Object} props - The properties object.
 * @param {string} props.color - The color of the button.
 * @param {boolean} props.isSelected - Indicates if the button is selected.
 * @param {Function} props.onClick - The function to call when the button is clicked.
 * 
 * @returns {JSX.Element} The rendered button component.
 */
const ColorButton: React.FC<ColorButtonProps> = ({color, isSelected, onClick}) => {
    return (
        <button
              key={color}
              style={{
                backgroundColor: color,
                border: isSelected ? "2px solid #000" : "1px solid #ccc",
                height: "20px",
                width: "20px",
                cursor: "pointer",
                borderRadius: "25%",
              }}
              onClick={() => onClick()}
              aria-label={`Select color ${color}`}
            />
    );
};

export default ColorButton;