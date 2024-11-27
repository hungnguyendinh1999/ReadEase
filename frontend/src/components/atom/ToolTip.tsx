import React from "react";
import "./ToolTip.css";

interface TooltipProps {
  text: string;
  visible: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({ text, visible }) => {
  return (
    <div className={`tooltip ${visible ? "visible" : ""}`}>
      {text}
    </div>
  );
};

export default Tooltip;