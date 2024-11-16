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
