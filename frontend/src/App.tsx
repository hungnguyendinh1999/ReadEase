import "./App.css";
import Sidebar from "./components/SideBar"
import SummaryIcon from "./assets/summary.png"
import SettingIcon from "./assets/setting.png"
import ReadAloudIcon from "./assets/read-aloud.png"
import SummaryScreen from "./screen/SummaryScreen"
import ReadaloudScreen from "./screen/ReadaloudScreen"
import SettingScreen from "./screen/SettingScreen"
import Modal from "./components/Modal";
import HomeScreen from "./screen/HomeScreen"

import { BrowserRouter as Router, Routes, Route, useLocation} from "react-router-dom";
import React, { useState } from "react";
import { SettingsProvider } from "./contexts/SettingsContext";

function AppLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Settings state
  const [voice, setVoice] = useState("Alloy");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [fontColor, setFontColor] = useState("#000000");
  const [fontTypeface, setFontTypeface] = useState("Arial");
  const [fontWeight, setFontWeight] = useState("normal");
  const [fontSize, setFontSize] = useState("12pt");
  const [fontStyle, setFontStyle] = useState("normal");
  const [textDecoration, setTextDecoration] = useState("none");
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const sidebarParams = [
    { imageSrc: SummaryIcon, title: "Summary", path: "/summary" },
    { imageSrc: ReadAloudIcon, title: "Read Aloud", path: "/readaloud" },
    { imageSrc: SettingIcon, title: "Settings", path: "/settings" },
  ];

    const hideSidebar = useLocation().pathname === "/";

  return (
    <div>
      {!hideSidebar && <Sidebar params={sidebarParams} onSettingsClick={openModal} />}
      <div style={{ marginLeft: "80px" }}>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/summary" element={<SummaryScreen />} />
          <Route path="/readaloud" element={<ReadaloudScreen />} />
        </Routes>
        {/* Render the settings modal */}
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <SettingScreen
            voice={voice}
            setVoice={setVoice}
            backgroundColor={backgroundColor}
            setBackgroundColor={setBackgroundColor}
            fontColor={fontColor}
            setFontColor={setFontColor}
            fontTypeface={fontTypeface}
            setFontTypeface={setFontTypeface}
            fontWeight={fontWeight}
            setFontWeight={setFontWeight}
            fontSize={fontSize}
            setFontSize={setFontSize}
            fontStyle={fontStyle}
            setFontStyle={setFontStyle}
            textDecoration={textDecoration}
            setTextDecoration={setTextDecoration}
          />
        </Modal>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <SettingsProvider>
      <Router>
        <AppLayout />
      </Router>
    </SettingsProvider>
  );
}
