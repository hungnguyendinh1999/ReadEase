// SettingScreen.tsx
import React, { useState } from "react";

import dummyAudio from '../assets/mommy.mp3';
import VoiceIcon from '../assets/voice-icon.png';
import BackgroundColorIcon from '../assets/background-color-icon.png';
import FontIcon from '../assets/font-icon.png';
import FontColorIcon from '../assets/font-color-icon.png';
import TypefaceIcon from '../assets/typeface-icon.png';
import WeightIcon from '../assets/weight-icon.png';
import FontSizeIcon from '../assets/font-size-icon.png';

import "./SettingScreen.css";
import ColorPicker from "../components/molecules/ColorPicker";
import Dropdown from "../components/atom/Dropdown";
import SettingField from "../components/molecules/SettingField";

const predefinedBackgroundColors = ["#A8DADC", "#F4A261", "#457B9D", "#FFE8D6", "#1D3557", "#FFFFFF", "#000000"];
const predefinedFontColors = ["#1D3557", "#F4F1DE", "#457B9D", "#264653", "#A8DADC", "#FFFFFF", "#000000"];
const voiceOptions = ["Voice 1", "Voice 2", "Voice 3", "Voice 4", "Voice 5"];
const typeFaces = ["Arial", "Times New Roman", "Courier New", "Verdana", "Comic Sans MS"];

type LocalSettings = {
  voice: string;
  backgroundColor: string;
  fontColor: string;
  fontTypeface: string;
  fontWeight: string;
  fontStyle: string;
  textDecoration: string;
  fontSize: string;
};

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
  fontStyle: string;
  setFontStyle: (value: string) => void;
  textDecoration: string;
  setTextDecoration: (value: string) => void;
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
  fontStyle,
  setFontStyle,
  textDecoration,
  setTextDecoration,
  fontSize,
  setFontSize,
}) => {
  const [localSettings, setLocalSettings] = useState({
    voice,
    backgroundColor,
    fontColor,
    fontTypeface,
    fontWeight,
    fontStyle,
    textDecoration,
    fontSize,
  });

  const [userText, setUserText] = useState("Sample Text Here");

  const updateSetting = (key: string, value: string) => {
    setLocalSettings((prev) => ({ ...prev, [key]: value }));
  };

  const toggleStyle = (
    key: keyof LocalSettings, 
    value: string, 
    defaultValue: string
  ) => {
    setLocalSettings((prev) => ({
      ...prev,
      [key]: prev[key] === value ? defaultValue : value,
    }));
  };

  const settingsConfig = [
    {
      key: "voice",
      icon: VoiceIcon,
      label: "Voice",
      component: (
        <Dropdown
          label=""
          options={voiceOptions}
          value={localSettings.voice}
          onChange={(e) => updateSetting("voice", e.target.value)}
        />
      ),
    },
    {
      key: "backgroundColor",
      icon: BackgroundColorIcon,
      label: "Background Color",
      component: (
        <ColorPicker
          label=""
          colors={predefinedBackgroundColors}
          selectedColor={localSettings.backgroundColor}
          onColorSelect={(color) => updateSetting("backgroundColor", color)}
        />
      ),
    },
    {
      key: "font-section",
      icon: FontIcon,
      label: "Font",
      isSection: true,
    },
    {
      key: "fontColor",
      icon: FontColorIcon,
      label: "Font Color",
      component: (
        <ColorPicker
          label=""
          colors={predefinedFontColors}
          selectedColor={localSettings.fontColor}
          onColorSelect={(color) => updateSetting("fontColor", color)}
        />
      ),
    },
    {
      key: "fontTypeface",
      icon: TypefaceIcon,
      label: "Typeface",
      component: (
        <Dropdown
          label=""
          options={typeFaces}
          value={localSettings.fontTypeface}
          onChange={(e) => updateSetting("fontTypeface", e.target.value)}
        />
      ),
    },
    {
      key: "fontSize",
      icon: FontSizeIcon,
      label: "Size",
      component: (
        <Dropdown
          label=""
          options={Array.from({ length: 17 }, (_, i) => (i + 8).toString())}
          value={localSettings.fontSize}
          onChange={(e) => updateSetting("fontSize", `${e.target.value}px`)}
        />
      ),
    },
    {
      key: "fontWeight",
      icon: WeightIcon,
      label: "Weight",
      component: (
        <div className="weight-buttons">
          <button
            className={localSettings.fontWeight === "bold" ? "active" : ""}
            onClick={() => toggleStyle("fontWeight", "bold", "normal")}
          >
            Bold
          </button>
          <button
            className={localSettings.fontStyle === "italic" ? "active" : ""}
            onClick={() => toggleStyle("fontStyle", "italic", "normal")}
          >
            Italics
          </button>
          <button
            className={localSettings.textDecoration === "underline" ? "active" : ""}
            onClick={() => toggleStyle("textDecoration", "underline", "none")}
          >
            Underline
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="settings-content-container">
        <div className="settings-left">
          <h3>Settings</h3>
          {settingsConfig.map(({ key, icon, label, component, isSection }) => {
            if (isSection) {
              return (
                <div className="settings-section-header">
                  {icon && <img src={icon} className="settings-icon" alt={`${label} Icon`} />}
                  <span>{label}</span>
                </div>
              );
            }

            const isIndented = key.startsWith("font") && !isSection;
            return (
              <div
                key={key}
                className={`setting-row ${isIndented ? "indented" : ""}`}
              >
                {icon && <img src={icon} className="settings-icon" alt={`${label} Icon`} />}
                <span>{label}</span>
                {component}
              </div>
            );
          })}
        </div>
        <div className="settings-right">
          <div className="presets">
            <h3>Presets</h3>

          </div>
        </div>
      </div>
      <div className="sample-textbox">
        <fieldset>
          <legend>Sample Textbox</legend>
          <textarea
            style={{
              width: "100%",
              height: "100px",
              borderRadius: "16px",
              border: "1px solid #000",
              padding: "4px",
              resize: "none",
              color: localSettings.fontColor,
              backgroundColor: localSettings.backgroundColor,
              fontFamily: localSettings.fontTypeface,
              fontWeight: localSettings.fontWeight,
              fontSize: localSettings.fontSize,
              fontStyle: localSettings.fontStyle,
              textDecoration: localSettings.textDecoration,
            }}
            value={userText}
            onChange={(e) => setUserText(e.target.value)}
          />
        </fieldset>
      </div>
      <button onClick={() => {
          setVoice(localSettings.voice);
          setBackgroundColor(localSettings.backgroundColor);
          setFontColor(localSettings.fontColor);
          setFontTypeface(localSettings.fontTypeface);
          setFontWeight(localSettings.fontWeight);
          setFontStyle(localSettings.fontStyle);
          setTextDecoration(localSettings.textDecoration);
          setFontSize(localSettings.fontSize);
        }}>
          Apply Settings
        </button>
    </div>
  );
};

export default SettingScreen;