import React from "react";

interface SettingFieldProps {
  icon: string;
  label: string;
  component: JSX.Element;
}

const SettingField: React.FC<SettingFieldProps> = ({ icon, label, component }) => (
  <fieldset>
    <div className="setting-row">
      <img src={icon} className="settings-icon" alt={`${label} Icon`} />
      <span>{label}</span>
      {component}
    </div>
  </fieldset>
);

export default SettingField;