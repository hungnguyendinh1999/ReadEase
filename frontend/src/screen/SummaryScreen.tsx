import React, { useState, ChangeEvent, FC } from "react";
import "./SummaryScreen.css";
import TextBox from "../components/atom/TextBox";
import UploadFileButton from "../components/molecules/UploadFileButton";
import SubmitButton from "../components/molecules/SubmitTextButton";
import Dropdown from "../components/atom/Dropdown";

const SummaryScreen: FC = () => {
    // Define state with types
    const [text, setText] = useState<string>("");
    const [vocabLevel, setVocabLevel] = useState<string>("Default");
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [height, setHeight] = useState<string>("80%");

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
        console.log("Pretend this is backend... handleFileUpload() called");
    };

    const handleSubmit = () => {
        // Submit logic will go here
        console.log("handleSubmit() called");
        setIsSubmitted(true); // Trigger animations and state changes
        setHeight("10%");
        console.log("sending " + text);
    };

    return (
        <div id="summary-screen">
            <div className={`flex-box ${isSubmitted ? "shrink-outer" : ""}`}>
                <div id="summary-input-container" style={{ height: height }}>
                    <div
                        id="summary-textbox-container"
                        className={`${isSubmitted ? "shrink" : ""}`}
                    >
                        {/* Use custom TextBox component */}
                        <TextBox
                            value={text}
                            onChange={handleTextChange}
                            placeholder="Type text here, or upload a txt file"
                        />
                    </div>

                    {/* Button Group */}
                    <div
                        id="summary-button-group"
                        className={`${isSubmitted ? "hidden" : ""}`}
                    >
                        {/* Left aligned button */}
                        <div id="summary-left-buttons">
                            <UploadFileButton
                                label="Upload File"
                                onClick={handleFileUpload}
                            />
                        </div>

                        {/* Right aligned button */}
                        <div id="summary-right-buttons">
                            <Dropdown
                                options={[
                                    "Default",
                                    "ELI5",
                                    "Intermediate",
                                    "Advanced",
                                ]}
                                value={vocabLevel}
                                onChange={handleVocabLevelChange}
                            />
                            <SubmitButton label="" onClick={handleSubmit} />
                        </div>
                    </div>
                </div>
            </div>
            {isSubmitted && (
                <div className="flex-box">
                    <div id="summary-output-container">
                        <div>
                            <div id="summary-title" className="center-text disable-selection">
                                <h1>Summarized Text</h1>
                            </div>
                            <div>
                                
                            </div>
                        </div>
                        <div id="smaller-container" className="hide-caret">
                            <TextBox
                                value=""
                                onChange={() => {}}
                                placeholder="Enter output here..."
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SummaryScreen;
