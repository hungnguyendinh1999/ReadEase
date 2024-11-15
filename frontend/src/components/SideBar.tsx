import { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import Icon from "../assets/icon.png"

interface SidebarProps {
  params: { imageSrc: string, title: string, path: string }[];
  onSettingsClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ params, onSettingsClick }) => {
  const menuItems = params.filter((item) => item.title !== "Settings");
  const settingsItem = params.find((item) => item.title === "Settings");

  return (
    <div className="sidebar">
        <div id="icon-holder">
            <img id="sidebar-icon" className="icon" src={Icon} />
        </div>
        {params.map((params, index) => (
            <Link key={"nav-btn-link-" + index} className="link" to={params.path}>
                <div key={"nav-btn-icon-" + index} className="nav-container" onClick={params.onClick}>
                    <img key={"nav-btn-icon-" + index} className="nav-icon" src={params.imageSrc} />
                    <p key={"nav-btn-title-" + index} className="nav-title"> {params.title} </p>
                </div>
            </Link>
        ))}
      
      {settingsItem && (
        <div className="settings-container">
          {/* Remove the Link and use onSettingsClick to open modal */}
          <div className="nav-link" onClick={onSettingsClick} style={{ cursor: "pointer" }}>
            <div className="nav-container">
              <img className="nav-icon" src={settingsItem.imageSrc} alt={settingsItem.title} />
              <p className="nav-title">{settingsItem.title}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;