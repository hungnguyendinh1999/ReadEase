import React from "react";

interface TextAreaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  cols?: number;
}

const TextArea: React.FC<TextAreaProps> = ({ label, value, onChange, rows = 4, cols = 50 }) => {
  return (
    <label>
      {label}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        cols={cols}
        style={{
          display: "block",
          marginTop: "8px",
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          width: "100%",
        }}
      ></textarea>
    </label>
  );
};

export default TextArea;
