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

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Settings state
  const [voice, setVoice] = useState("Alloy");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [fontColor, setFontColor] = useState("#000000");
  const [fontTypeface, setFontTypeface] = useState("Arial");
  const [fontWeight, setFontWeight] = useState("normal");
  const [fontSize, setFontSize] = useState("12pt");
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const sidebarParams = [
    { imageSrc: SummaryIcon, title: "Summary", path: "/summary" },
    { imageSrc: ReadAloudIcon, title: "Read Aloud", path: "/readaloud" },
    { imageSrc: SettingIcon, title: "Settings", path: "/settings" }, // Path isn't used for settings
  ];

  return (
    <Router>
      <div style={{ display: "flex" }}>
        {/* Pass openModal as onSettingsClick to Sidebar */}
        <Sidebar params={sidebarParams} onSettingsClick={openModal} />
        <div style={{ marginLeft: "90px", padding: "20px" }}>
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
            />
          </Modal>
        </div>
      </div>
    </Router>
  );
};

export default App;