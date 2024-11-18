import React from "react";

interface TextAreaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  cols?: number;
}

/**
 * TextArea component renders a labeled textarea input.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.label - The label for the textarea.
 * @param {string} props.value - The current value of the textarea.
 * @param {function} props.onChange - The function to call when the textarea value changes.
 * @param {number} [props.rows=4] - The number of rows for the textarea (default is 4).
 * @param {number} [props.cols=50] - The number of columns for the textarea (default is 50).
 *
 * @returns {JSX.Element} The rendered TextArea component.
 */
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
