import React from "react";

import ColorButton from "../atom/ColorButton";

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
            <ColorButton
              color={color}
              isSelected={color === selectedColor}
              onClick={() => onColorSelect(color)}
            />
          ))}
        </div>
      </div>
    </fieldset>
  );
};

export default ColorPicker;
