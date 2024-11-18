import {Link} from "react-router-dom";
import "./Sidebar.css";
import Icon from "../assets/icon.png"

interface SidebarProps {
  params: { imageSrc: string, title: string, path: string }[];
  onSettingsClick: () => void;
}

/**
 * Sidebar component that anchors on the left of the screen almost at all time
 * @author Khoa Nguyen
 *
 * @param params navigation buttons, with image, title and the url path to the screen
 * @param onSettingsClick action perform when setting button is clicked
 */
const Sidebar: React.FC<SidebarProps> = ({ params, onSettingsClick }) => {
  const lowerMenuTitles : string[] = ["Feedback"];

  const upperMenuItems = params.filter((item) => item.title !== "Settings" && !lowerMenuTitles.includes(item.title));
  const lowerMenuItems = params.filter((item) => lowerMenuTitles.includes(item.title));
  const settingsItem = params.find((item) => item.title === "Settings");
  let index = 0;

  return (
    <div className="sidebar">
      <div id="icon-holder">
        <img id="sidebar-icon" className="icon" src={Icon} alt="Sidebar Icon" />
      </div>
      {upperMenuItems.map((item) => (
        <Link key={"nav-link-" + index++} className="nav-link" to={item.path}>
          <div className="nav-container">
            <img className="nav-icon" src={item.imageSrc} alt={item.title} />
            <p className="nav-title">{item.title}</p>
          </div>
        </Link>
      ))}
      
      {settingsItem && (
        <div className="settings-container">
          {/* Surprise! Lower level links */}
          {lowerMenuItems.map((item) => (
            <Link key={"nav-link-" + index++} className="nav-link" to={item.path}>
              <div className="nav-container">
                <img className="nav-icon" src={item.imageSrc} alt={item.title} />
                <p className="nav-title">{item.title}</p>
              </div>
            </Link>
          ))}
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