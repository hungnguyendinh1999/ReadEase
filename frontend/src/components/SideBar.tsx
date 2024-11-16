import {Link} from "react-router-dom";
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
        <img id="sidebar-icon" className="icon" src={Icon} alt="Sidebar Icon" />
      </div>
      {menuItems.map((item, index) => (
        <Link key={"nav-link-" + index} className="nav-link" to={item.path}>
          <div className="nav-container">
            <img className="nav-icon" src={item.imageSrc} alt={item.title} />
            <p className="nav-title">{item.title}</p>
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