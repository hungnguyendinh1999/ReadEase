import React, {FC, ChangeEvent} from 'react';
import './Dropdown.css';

interface DropdownProps {
    options: string[]; // Array of string options
    value: string; // Currently selected value
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void; // Callback for value change
    label?: string; // Optional label for accessibility
    width?: string;
}

const Dropdown: FC<DropdownProps> = ({options, value, onChange, label, width}) => {
    return (
        <div className="dropdown-container" style={{width: width}}>
            {label && <label className="dropdown-label">{label}</label>}
            <select className="dropdown" value={value} onChange={onChange}>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;
