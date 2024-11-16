import React from "react";

interface ColorButtonProps {
    color: string;
    isSelected: boolean;
    onClick: () => void;
  }
  

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