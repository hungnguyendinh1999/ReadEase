import './TextBox.css';
import React, {FC, ChangeEvent} from 'react';

interface TextBoxProps {
    value: string;
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    rows?: number;
    readonly?: boolean;
}

const TextBox: FC<TextBoxProps> = ({value, onChange, placeholder = 'Enter text here...', rows = 5, readonly = false}) => {
    return (
        <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            className="custom-textbox"
            readOnly={readonly}
        />
    );
};

export default TextBox;
