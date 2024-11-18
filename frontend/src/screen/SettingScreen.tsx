// SettingScreen.tsx
import React, { useState } from "react";
import { useSettings } from "../contexts/SettingsContext";

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
import StyleToggleButton from "../components/atom/StyleToggleButton";
import DemoVoiceBar from "../components/molecules/DemoVoiceBar";
import SingleLineTextButton from "../components/atom/SingleLineTextButton";


const predefinedBackgroundColors = ["#A8DADC", "#F4A261", "#457B9D", "#FFE8D6", "#1D3557", "#FFFFFF", "#000000"];
const predefinedFontColors = ["#1D3557", "#F4F1DE", "#457B9D", "#264653", "#A8DADC", "#FFFFFF", "#000000"];
const typeFaces = ["Arial", "Times New Roman", "Courier New", "Verdana", "Comic Sans MS"];

const fontMaxSize = 36;
const fontMinSize = 12;
const fontRange = Array.from({ length: fontMaxSize - fontMinSize + 1 }, (_, i) => `${i + fontMinSize}`);

const presets = [
  {
    name: ""
  },
  {
    name: "Light Mode",
    backgroundColor: "#FFFFFF",
    fontColor: "#000000",
    fontTypeface: "Arial",
    fontWeight: "normal",
    fontSize: "18px",
    fontStyle: "normal",
    textDecoration: "none",
  },
  {
    name: "Dark Mode",
    backgroundColor: "#000000",
    fontColor: "#FFFFFF",
    fontTypeface: "Arial",
    fontWeight: "bold",
    fontSize: "18px",
    fontStyle: "italic",
    textDecoration: "none",
  },
  {
    name: "Classic",
    backgroundColor: "#FFE8D6",
    fontColor: "#1D3557",
    fontTypeface: "Times New Roman",
    fontWeight: "normal",
    fontSize: "18px",
    fontStyle: "normal",
    textDecoration: "none",
  },
  {
    name: "Pastel",
    backgroundColor: "#f3f1e3",
    fontColor: "#61797f",
    fontTypeface: "Verdana",
    fontWeight: "bold",
    fontSize: "18px",
    fontStyle: "none",
    textDecoration: "none",
  },
  {
    name: "Pastel Blue",
    backgroundColor: "#D8EFFE",
    fontColor: "#2E4A62",
    fontTypeface: "Verdana",
    fontWeight: "bold",
    fontSize: "18px",
    fontStyle: "none",
    textDecoration: "none",
  },
  {
    name: "Pastel Green",
    backgroundColor: "#DFFFE3",
    fontColor: "#3A4A28",
    fontTypeface: "Verdana",
    fontWeight: "bold",
    fontSize: "18px",
    fontStyle: "none",
    textDecoration: "none",
  },
  {
    name: "Pastel Yellow",
    backgroundColor: "#FFF9E3",
    fontColor: "#4D4D4D",
    fontTypeface: "Verdana",
    fontWeight: "bold",
    fontSize: "18px",
    fontStyle: "none",
    textDecoration: "none",
  },
  {
    name: "Pastel Purple",
    backgroundColor: "#EAEAFF",
    fontColor: "#2D3142",
    fontTypeface: "Verdana",
    fontWeight: "bold",
    fontSize: "18px",
    fontStyle: "none",
    textDecoration: "none",
  }
];

/**
 * `SettingScreen` is a React functional component that provides a user interface for adjusting various settings
 * such as voice, background color, font color, typeface, font weight, font style, text decoration, and font size.
 * It also allows users to select predefined presets and apply them to the settings.
 *
 * @component
 * @example
 * return (
 *   <SettingScreen />
 * )
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @remarks
 * The component uses local state to manage the selected preset and settings. It provides functions to handle
 * preset changes, update individual settings, and toggle style settings. The settings are displayed in a
 * left-side configuration panel, and a sample textbox is provided to preview the applied settings.
 *
 * @function
 * @name SettingScreen
 *
 * @hook
 * @name useSettings
 * @description Custom hook to manage settings state.
 *
 * @state {string} selectedPresetName - The name of the currently selected preset.
 * @state {object} localSettings - The local state object containing the current settings.
 * @state {string} userText - The text entered by the user in the sample textbox.
 *
 * @param {string} key - The key of the setting to update.
 * @param {string} value - The new value for the setting.
 *
 * @param {string} presetName - The name of the preset to apply.
 *
 * @param {keyof typeof localSettings} key - The key of the style setting to toggle.
 * @param {string} value - The value to toggle the style setting to.
 * @param {string} defaultValue - The default value to revert the style setting to.
 *
 * @param {string} key - The key of the setting to update.
 * @param {string} value - The new value for the setting.
 *
 * @param {string} presetName - The name of the preset to apply.
 *
 * @param {keyof typeof localSettings} key - The key of the style setting to toggle.
 * @param {string} value - The value to toggle the style setting to.
 * @param {string} defaultValue - The default value to revert the style setting to.
 */
const SettingScreen: React.FC = () => {
  const {
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
  } = useSettings();

  // Local state to manage selected preset
  const [selectedPresetName, setSelectedPresetName] = useState("");

  // Local state to manage settings
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

  // Function to handle preset change
  const handlePresetChange = (presetName: string) => {
    setSelectedPresetName(presetName);
    const selectedPreset = presets.find((preset) => preset.name === presetName);
    if (selectedPreset) {
      setLocalSettings((prev) => ({
        ...prev,
        ...selectedPreset,
      }));
    }
  };

  // Function to update a setting in local state
  const updateSetting = (key: string, value: string) => {
    setSelectedPresetName("");
    setLocalSettings((prev) => ({ ...prev, [key]: value }));
  };

  // Function to toggle a style setting in local state (for bold, italics, underline)
  const toggleStyle = (
    key: keyof typeof localSettings,
    value: string,
    defaultValue: string
  ) => {
    setLocalSettings((prev) => ({
      ...prev,
      [key]: prev[key] === value ? defaultValue : value,
    }));
  };

  // Local state to manage user text in textbox (initially set to a default text)
  const [userText, setUserText] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.");

  // Settings (left-side) configuration
  const settingsConfig = [
    {
      key: "voice",
      icon: VoiceIcon,
      label: "Voice",
      component: (
        <DemoVoiceBar voice={localSettings.voice} onChange={(v) =>
            setLocalSettings((prev) => ({
              ...prev,
              voice: v,
            }))} />
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
          options={fontRange}
          value={localSettings.fontSize.replace("px", "")}
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
          <div className="weight-buttons">
          <StyleToggleButton
            label="Bold"
            isActive={localSettings.fontWeight === "bold"}
            onClick={() => toggleStyle("fontWeight", "bold", "normal")}
          />
          <StyleToggleButton
            label="Italics"
            isActive={localSettings.fontStyle === "italic"}
            onClick={() => toggleStyle("fontStyle", "italic", "normal")}
          />
          <StyleToggleButton
            label="Underline"
            isActive={localSettings.textDecoration === "underline"}
            onClick={() => toggleStyle("textDecoration", "underline", "none")}
          />
        </div>
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
                <div key={key} className="settings-section-header">
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
            <Dropdown
              label="Select Preset"
              options={presets.map((preset) => preset.name)}
              value={selectedPresetName}
              onChange={(e) => handlePresetChange(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="sample-textbox">
        <fieldset>
          <legend style={{fontSize: "18px", fontWeight: "bold"}}>Sample Textbox</legend>
          <textarea
            style={{
              width: "100%",
              height: "100px",
              borderRadius: "16px",
              border: "2px var(--main-gray) solid",
              padding: "4px 8px",
              resize: "none",
              outline: "none",
              boxSizing: "border-box",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
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
            placeholder="Enter text here..."
          />
        </fieldset>
      </div>
      <SingleLineTextButton className="apply-button" onClick={() => {
        setVoice(localSettings.voice);
        setBackgroundColor(localSettings.backgroundColor);
        setFontColor(localSettings.fontColor);
        setFontTypeface(localSettings.fontTypeface);
        setFontWeight(localSettings.fontWeight);
        setFontStyle(localSettings.fontStyle);
        setTextDecoration(localSettings.textDecoration);
        setFontSize(localSettings.fontSize);
      }} text={"Apply Settings"} textSize={16} height={52} width={150}/>
    </div>
  );
};

export default SettingScreen;