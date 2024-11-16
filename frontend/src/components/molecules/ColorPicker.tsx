import React from "react";

interface ColorPickerProps {
  label: string;
  colors: string[]; 
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  colors,
  selectedColor,
  onColorSelect,
}) => {
  return (
    <fieldset>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <label>{label}</label>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {colors.map((color) => (
            <button
              key={color}
              style={{
                backgroundColor: color,
                border: selectedColor === color ? "2px solid #000" : "1px solid #ccc",
                height: "20px",
                width: "20px",
                cursor: "pointer",
                borderRadius: "25%",
              }}
              onClick={() => onColorSelect(color)}
              aria-label={`Select color ${color}`}
            />
          ))}
        </div>
      </div>
    </fieldset>
  );
};

export default ColorPicker;
