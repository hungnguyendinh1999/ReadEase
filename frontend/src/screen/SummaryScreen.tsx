import React, {useState, ChangeEvent, FC} from "react";
import TextBox from "../components/atom/TextBox";
import UploadFileButton from '../components/molecules/UploadFileButton';
import SubmitButton from "../components/molecules/SubmitTextButton";

const SummaryScreen: FC = () => {
  // Define state with types
  const [text, setText] = useState<string>('');
  const [vocabLevel, setVocabLevel] = useState<string>('Beginner');

  // Event handler for textarea input
  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  // Event handler for dropdown selection
  const handleVocabLevelChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setVocabLevel(event.target.value);
  };

  // Placeholder functions for button actions
  const handleFileUpload = () => {
    // File upload logic will go here
    console.log("Pretend this is backend... handleFileUpload() called")
  };

  const handleSubmit = () => {
    // Submit logic will go here
    console.log("handleSubmit() called")
    console.log("sending " + text)
  };

  return (
    <div>
      <h1>Summary Screen</h1>
      <p>This is some content.</p>
      <div className="summary-screen">
        {/* Use custom TextBox component */}
        <TextBox 
          value={text} 
          onChange={handleTextChange} 
          placeholder="Type text here... or upload a txt file"
        />
        {/* Button Group */}
        <div className="button-group">
          <UploadFileButton label="Upload File" onClick={handleFileUpload} />
          
          <select 
            value={vocabLevel} 
            onChange={handleVocabLevelChange}>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          <SubmitButton label="" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default SummaryScreen;