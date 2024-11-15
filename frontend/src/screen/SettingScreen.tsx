// SettingScreen.tsx
import React, { useState } from "react";

import dummyAudio from '../assets/mommy.mp3';
import VoiceIcon from '../assets/setting.png';

import "./SettingScreen.css"

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
  const updateSetting = (key: string, value: string) => {
    setLocalSettings((prev) => ({ ...prev, [key]: value }));
  };

  const playVoiceSample = () => {
    const audio = new Audio(dummyAudio);
    audio.play();
  };

  const [localSettings, setLocalSettings] = useState({
    voice,
    backgroundColor,
    fontColor,
    fontTypeface,
    fontWeight,
    fontSize,
  });

  const handleApplySettings = () => {
    setVoice(localSettings.voice);
    setBackgroundColor(localSettings.backgroundColor);
    setFontColor(localSettings.fontColor);
    setFontTypeface(localSettings.fontTypeface);
    setFontWeight(localSettings.fontWeight);
    setFontSize(localSettings.fontSize);
  };

  return (
    <div>
      <img id="settings-icon" className="settings-icon" src={VoiceIcon} alt="Voice Icon" />
      <form className="settings-form">
        <h2>Settings</h2>
        {/* Voice Setting */}
        <fieldset className="setting-row">
          <span className="setting-title">Voice:</span>
          <select
            value={localSettings.voice}
            onChange={(e) => updateSetting("voice", e.target.value)}
            className="voice-dropdown"
          >
            <option value="Alloy">Alloy</option>
            <option value="Ash">Ash</option>
            <option value="Ballad">Ballad</option>
            <option value="Coral">Coral</option>
            <option value="Echo">Echo</option>
            <option value="Sage">Sage</option>
          </select>
          <button type="button" className="play-button" onClick={playVoiceSample}>
            ▶
          </button>
        </fieldset>
        {/* Background Color */}
        <fieldset>
          <legend>Background Color</legend>
          <input
            type="color"
            value={localSettings.backgroundColor}
            onChange={(e) => updateSetting("backgroundColor", e.target.value)}
          />
        </fieldset>

        {/* Font Settings */}
        <fieldset>
          <legend>Font</legend>

          <label>
            Font Color:
            <input
              type="color"
              value={localSettings.fontColor}
              onChange={(e) => updateSetting("fontColor", e.target.value)}
            />
          </label>

          <label>
            Font Typeface:
            <select
              value={localSettings.fontTypeface}
              onChange={(e) => updateSetting("fontTypeface", e.target.value)}
            >
              <option value="Arial">Arial</option>
              <option value="Verdana">Verdana</option>
              <option value="Times New Roman">Times New Roman</option>
            </select>
          </label>

          <label>
            Font Weight:
            <select
              value={localSettings.fontWeight}
              onChange={(e) => updateSetting("fontWeight", e.target.value)}
            >
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
              <option value="bolder">Bolder</option>
              <option value="lighter">Lighter</option>
            </select>
          </label>

          <label>
            Font Size:
            <input
              type="number"
              value={parseInt(localSettings.fontSize)}
              min="8"
              max="36"
              onChange={(e) => updateSetting("fontSize", e.target.value + "pt")}
            />
          </label>
        </fieldset>

        {/* Sample Preview Textbox */}
        <fieldset className="preview-container">
          <legend>Sample Text Appearance</legend>
          <div
            className="sample-textbox"
            style={{
              backgroundColor: localSettings.backgroundColor,
              color: localSettings.fontColor,
              fontFamily: localSettings.fontTypeface,
              fontWeight: localSettings.fontWeight,
              fontSize: localSettings.fontSize,
            }}
            contentEditable
            suppressContentEditableWarning={true}
          >
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
            <p>You can type here to see how your settings look in real time!</p>
          </div>
        </fieldset>

        {/* Apply Button */}
        <button type="button" onClick={handleApplySettings} className="apply-button">
          Apply Settings
        </button>
      </form>
    </div>
  );
};

export default SettingScreen;