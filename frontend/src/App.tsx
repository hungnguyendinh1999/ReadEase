import "./App.css";

import Sidebar from "./components/SideBar"
import SummaryIcon from "./assets/summary.png"
import SettingIcon from "./assets/setting.png"
import ReadAloudIcon from "./assets/read-aloud.png"
import SummaryScreen from "./screen/SummaryScreen"
import ReadaloudScreen from "./screen/ReadaloudScreen"
import SettingScreen from "./screen/SettingScreen"
import HomeScreen from "./screen/HomeScreen"

import {BrowserRouter as Router, Routes, Route, useLocation} from "react-router-dom";
import {useEffect} from "react";

function AppLayout() {
    const sidebarParams = [
        {imageSrc: SummaryIcon, title: "Summary", path: "/summary"},
        {imageSrc: ReadAloudIcon, title: "Read Aloud", path: "/readaloud"},
        {imageSrc: SettingIcon, title: "Settings", path: "/setting"},
    ];

    const hideSidebar = useLocation().pathname === "/";

    return (
        <div>
            {!hideSidebar && <Sidebar params={sidebarParams}/>}
            <div style={{marginLeft: "80px"}}>
                <Routes>
                    <Route path="/" element={<HomeScreen/>}/>
                    <Route path="/summary" element={<SummaryScreen/>}/>
                    <Route path="/readaloud" element={<ReadaloudScreen/>}/>
                    <Route path="/setting" element={<SettingScreen/>}/>
                </Routes>
            </div>
        </div>
    );
};

export default function App() {
    return (
        <Router>
            <AppLayout/>
        </Router>
    );
}
