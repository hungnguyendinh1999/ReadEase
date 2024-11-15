import { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import Icon from "../assets/icon.png"

interface SidebarProps {
    params: {imageSrc: string, title: string, path: string}[];
}

const Sidebar: React.FC<SidebarProps> = ({params}) => {
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
    </div>
  );
};

export default Sidebar;
