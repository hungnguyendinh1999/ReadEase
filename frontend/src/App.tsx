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
        
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <SettingScreen />
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
