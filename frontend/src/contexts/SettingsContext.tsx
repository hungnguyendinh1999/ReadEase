import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";

interface SettingsContextType {
  voice: string;
  setVoice: React.Dispatch<React.SetStateAction<string>>;
  backgroundColor: string;
  setBackgroundColor: React.Dispatch<React.SetStateAction<string>>;
  fontColor: string;
  setFontColor: React.Dispatch<React.SetStateAction<string>>;
  fontTypeface: string;
  setFontTypeface: React.Dispatch<React.SetStateAction<string>>;
  fontWeight: string;
  setFontWeight: React.Dispatch<React.SetStateAction<string>>;
  fontSize: string;
  setFontSize: React.Dispatch<React.SetStateAction<string>>;
  fontStyle: string;
  setFontStyle: React.Dispatch<React.SetStateAction<string>>;
  textDecoration: string;
  setTextDecoration: React.Dispatch<React.SetStateAction<string>>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

interface SettingsProviderProps {
  children: ReactNode;
}

/**
 * SettingsProvider component that provides settings context to its children.
 * 
 * @param {SettingsProviderProps} props - The properties for the SettingsProvider component.
 * @param {React.ReactNode} props.children - The child components that will have access to the settings context.
 * 
 * @returns {JSX.Element} The SettingsProvider component.
 * 
 * @description
 * This component initializes and provides various settings such as voice, background color, font color, font typeface,
 * font weight, font size, font style, and text decoration to its children. The settings are stored in local storage
 * and CSS variables are updated accordingly.
 * 
 * @example
 * ```tsx
 * <SettingsProvider>
 *   <YourComponent />
 * </SettingsProvider>
 * ```
 * 
 * @context
 * The context value provided includes:
 * - `voice`: The selected voice.
 * - `setVoice`: Function to update the voice.
 * - `backgroundColor`: The background color of the text box.
 * - `setBackgroundColor`: Function to update the background color.
 * - `fontColor`: The font color of the text box.
 * - `setFontColor`: Function to update the font color.
 * - `fontTypeface`: The font typeface of the text box.
 * - `setFontTypeface`: Function to update the font typeface.
 * - `fontWeight`: The font weight of the text box.
 * - `setFontWeight`: Function to update the font weight.
 * - `fontSize`: The font size of the text box.
 * - `setFontSize`: Function to update the font size.
 * - `fontStyle`: The font style of the text box.
 * - `setFontStyle`: Function to update the font style.
 * - `textDecoration`: The text decoration of the text box.
 * - `setTextDecoration`: Function to update the text decoration.
 */
export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [voice, setVoice] = useState(() => localStorage.getItem("voice") || "Alloy");
  const [backgroundColor, setBackgroundColor] = useState(
    () => localStorage.getItem("backgroundColor") || "#ffffff"
  );
  const [fontColor, setFontColor] = useState(
    () => localStorage.getItem("fontColor") || "#000000"
  );
  const [fontTypeface, setFontTypeface] = useState(
    () => localStorage.getItem("fontTypeface") || "Arial"
  );
  const [fontWeight, setFontWeight] = useState(
    () => localStorage.getItem("fontWeight") || "normal"
  );
  const [fontSize, setFontSize] = useState(
    () => localStorage.getItem("fontSize") || "12pt"
  );
  const [fontStyle, setFontStyle] = useState(
    () => localStorage.getItem("fontStyle") || "normal"
  );
  const [textDecoration, setTextDecoration] = useState(
    () => localStorage.getItem("textDecoration") || "none"
  );

  const updateCSSVariable = (name: string, value: string) => {
    document.documentElement.style.setProperty(name, value);
  }

  // use
  useEffect(() => {
    updateCSSVariable("--voice", voice);
    localStorage.setItem("voice", voice);
  }, [voice]);

  useEffect(() => {
    updateCSSVariable("--textbox-background-color", backgroundColor);
    localStorage.setItem("backgroundColor", backgroundColor);
  }, [backgroundColor]);

  useEffect(() => {
    updateCSSVariable("--textbox-font-color", fontColor);
    localStorage.setItem("fontColor", fontColor);
  }, [fontColor]);

  useEffect(() => {
    updateCSSVariable("--textbox-font-typeface", fontTypeface);
    localStorage.setItem("fontTypeface", fontTypeface);
  }, [fontTypeface]);

  useEffect(() => {
    updateCSSVariable("--textbox-font-weight", fontWeight);
    localStorage.setItem("fontWeight", fontWeight);
  }, [fontWeight]);

  useEffect(() => {
    updateCSSVariable("--textbox-font-size", fontSize);
    localStorage.setItem("fontSize", fontSize);
  }, [fontSize]);

  useEffect(() => {
    updateCSSVariable("--textbox-font-style", fontStyle);
    localStorage.setItem("fontStyle", fontStyle);
  }, [fontStyle]);

  useEffect(() => {
    updateCSSVariable("--textbox-text-decoration", textDecoration);
    localStorage.setItem("textDecoration", textDecoration);
  }, [textDecoration]);

  return (
    <SettingsContext.Provider
      value={{
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
        fontStyle,
        setFontStyle,
        textDecoration,
        setTextDecoration,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
