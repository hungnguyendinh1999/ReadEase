import React from 'react';
import RadioButton from '../atom/RadioButton';
import './RowRadioButtons.css'

interface RowRadioButtonsProps {
  question: string; // The question to display
  options: string[]; // List of options for radio buttons
  name: string; // Name of the radio group (for form accessibility)
  selectedValue: string; // Currently selected value
  onChange: (value: string) => void; // Callback for when the selection changes
}

const RowRadioButtons: React.FC<RowRadioButtonsProps> = ({
  question,
  options,
  name,
  selectedValue,
  onChange,
}) => {
  return (
    <div className="row-radio-buttons">
      <p className="question-box">{question}</p>
      <div className="radio-buttons-container">
        {options.map((option) => (
          <RadioButton
            key={option}
            label={option}
            name={name}
            value={option}
            checked={selectedValue === option}
            onChange={(e) => onChange(e.target.value)}
          />
        ))}
      </div>
    </div>
  );
};

export default RowRadioButtons;
