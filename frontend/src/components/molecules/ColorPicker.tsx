import React from "react";

import ColorButton from "../atom/ColorButton";

interface ColorPickerProps {
  label: string;
  colors: string[]; 
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

/**
 * ColorPicker component allows users to select a color from a given list of colors.
 *
 * @param {string} label - The label for the color picker.
 * @param {string[]} colors - An array of color values to choose from.
 * @param {string} selectedColor - The currently selected color.
 * @param {(color: string) => void} onColorSelect - Callback function to handle color selection.
 *
 * @returns {JSX.Element} The rendered ColorPicker component.
 */
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
          {colors.map((color, index) => (
            <ColorButton
              key={color || index}
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
