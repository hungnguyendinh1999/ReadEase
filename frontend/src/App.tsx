import "./App.css";

import Sidebar from "./components/SideBar"
import SummaryIcon from "./assets/summary.png"
import SettingIcon from "./assets/setting.png"
import ReadAloudIcon from "./assets/read-aloud.png"
import SummaryScreen from "./screen/SummaryScreen"
import ReadaloudScreen from "./screen/ReadaloudScreen"
import SettingScreen from "./screen/SettingScreen"
import HomeScreen from "./screen/HomeScreen"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

const App: React.FC = () => {
  const sidebarParams = [
    {imageSrc: SummaryIcon, title: "Summary", path: "/summary"},
    {imageSrc: ReadAloudIcon, title: "Read Aloud", path: "/readaloud"},
    {imageSrc: SettingIcon, title: "Settings", path: "/setting"},
  ];

  return (
    <Router>
        <div style={{ display: "flex" }}>
          <Sidebar params={sidebarParams} />
          <div style={{marginLeft: "90px", padding: "20px"}}>
            <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/summary" element={<SummaryScreen />} />
                <Route path="/readaloud" element={<ReadaloudScreen />} />
                <Route path="/setting" element={<SettingScreen />} />
            </Routes>
          </div>
        </div>
    </Router>
  );
};

export default App;
