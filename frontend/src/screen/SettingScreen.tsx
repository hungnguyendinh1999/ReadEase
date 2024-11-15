// SettingScreen.tsx
import React, { useState } from "react";

interface SettingScreenProps {
  voice: string;
  setVoice: (value: string) => void;
  backgroundColor: string;
  setBackgroundColor: (value: string) => void;
  fontColor: string;
  setFontColor: (value: string) => void;
  fontTypeface: string;
  setFontTypeface: (value: string) => void;
  fontWeight: string;
  setFontWeight: (value: string) => void;
  fontSize: string;
  setFontSize: (value: string) => void;
}

const SettingScreen: React.FC<SettingScreenProps> = ({
  voice,
  setVoice,
  backgroundColor,
  setBackgroundColor,
  fontColor,
  setFontColor,
  fontTypeface,
  setFontTypeface,
  fontWeight,
  setFontWeight,
  fontSize,
  setFontSize,
}) => {
  // Temporary states for local preview
  const [tempVoice, setTempVoice] = useState(voice);
  const [tempBackgroundColor, setTempBackgroundColor] = useState(backgroundColor);
  const [tempFontColor, setTempFontColor] = useState(fontColor);
  const [tempFontTypeface, setTempFontTypeface] = useState(fontTypeface);
  const [tempFontWeight, setTempFontWeight] = useState(fontWeight);
  const [tempFontSize, setTempFontSize] = useState(fontSize);

  const handleApplySettings = () => {
    setVoice(tempVoice);
    setBackgroundColor(tempBackgroundColor);
    setFontColor(tempFontColor);
    setFontTypeface(tempFontTypeface);
    setFontWeight(tempFontWeight);
    setFontSize(tempFontSize);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Settings</h2>
      
      {/* Voice Setting */}
      <label>
        Voice:
        <select value={voice} onChange={(e) => setVoice(e.target.value)}>
          <option value="Alloy">Alloy</option>
          <option value="Ash">Ash</option>
          <option value="Ballad">Ballad</option>
          <option value="Coral">Coral</option>
          <option value="Echo">Echo</option>
          <option value="Sage">Sage</option>
        </select>
      </label>

      {/* Background Color */}
      <label>
        Background Color:
        <input
          type="color"
          value={tempBackgroundColor}
          onChange={(e) => setTempBackgroundColor(e.target.value)}
        />
      </label>

      {/* Font Color */}
      <label>
        Font Color:
        <input
          type="color"
          value={tempFontColor}
          onChange={(e) => setTempFontColor(e.target.value)}
        />
      </label>

      {/* Font Typeface */}
      <label>
        Font Typeface:
        <select value={tempFontColor} onChange={(e) => setTempFontTypeface(e.target.value)}>
          <option value="Arial">Arial</option>
          <option value="Verdana">Verdana</option>
          <option value="Times New Roman">Times New Roman</option>
          {/* Add more typefaces as needed */}
        </select>
      </label>

      {/* Font Weight */}
      <label>
        Font Weight:
        <select value={tempFontWeight} onChange={(e) => setTempFontWeight(e.target.value)}>
          <option value="normal">Normal</option>
          <option value="bold">Bold</option>
          <option value="bolder">Bolder</option>
          <option value="lighter">Lighter</option>
        </select>
      </label>

      {/* Font Size */}
      <label>
        Font Size:
        <input
          type="number"
          value={parseInt(tempFontSize)}
          min="8"
          max="36"
          onChange={(e) => setTempFontSize(e.target.value + "pt")}
        />
      </label>

      {/* Sample Preview Textbox */}
      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: tempBackgroundColor,
          color: tempFontColor,
          fontFamily: tempFontTypeface,
          fontWeight: tempFontWeight,
          fontSize: tempFontSize,
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
        contentEditable
        suppressContentEditableWarning={true}
      >
        Sample textbox appearance
        <p>You can type here to see how your settings look in real time!</p>
      </div>
      {/* Apply Button */}
      <button onClick={handleApplySettings} style={{ marginTop: "20px" }}>
        Apply Settings
      </button>
    </div>
  );
};

export default SettingScreen;