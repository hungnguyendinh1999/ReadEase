// RadioButton.tsx
import React from 'react';
import './RadioButton.css'

interface RadioButtonProps {
  label: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({ label, name, value, checked, onChange }) => {
  return (
    <label className={`radio-button ${checked ? 'radio-button-checked' : ''}`}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="radio-button-input"
      />
      <span>{label}</span>
    </label>
  );
};

export default RadioButton;
