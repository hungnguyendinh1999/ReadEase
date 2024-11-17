import React, { useState, ChangeEvent, FC, useRef } from "react";
import "./SummaryScreen.css";
import TextBox from "../components/atom/TextBox";
import UploadFileButton from "../components/molecules/UploadFileButton";
import SubmitButton from "../components/molecules/SubmitTextButton";
import Dropdown from "../components/atom/Dropdown";
import {createSummarizeResponseService} from "../services/backend-service"
import Loading from "../components/Loading";
import SpeakerButton from "../components/molecules/SpeakerButton"

type VocabLevel = {
    level: string;
    instruction: string;
};

const vocabLevelArray: VocabLevel[] = [
    { level: 'Default', instruction: 'Use the same level of language as the input text.' },
    { level: 'ELI5', instruction: 'Use the same level of language as eli5.' },
    { level: 'Simple', instruction: 'Use simple and easy-to-understand language.' },
    { level: 'Intermediate', instruction: 'Use moderately complex language for intermediate readers.' },
    { level: 'Advanced', instruction: 'Use advanced language with technical details where appropriate.' },
  ];

const harmContext =
    "If the input text contains harmful, illegal, or offensive content, respond with 'Content not allowed.' and give a 1-sentence explanation.";

const constructVocabContext = (selectedVocabLevelString: string) => {
    const defaultContext =
        "In a neutral and concise manner. "
    // get selectedVocabLevel from selectedVocabLevelString
    const vocabLevel = vocabLevelArray.find(
        (option) => option.level === selectedVocabLevelString
    );
    if (vocabLevel) {
        return `${defaultContext} ${vocabLevel.instruction}`;
    }

    return defaultContext; // Fallback if no level is matched
};

const SummaryScreen: FC = () => {
    // Define state with types
    const fileInputRef = useRef(null);
    const [text, setText] = useState<string>("");
    const [vocabLevel, setVocabLevel] = useState<string>("Default");
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [height, setHeight] = useState<string>("80%");
    const [summary, setSummary] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isReadingClicked, setIsReadingClicked] = useState<boolean>(false);
    

    // Event handler for textarea input
    const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    };

    // Event handler for Vocab Level
    const handleVocabLevelChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setVocabLevel(event.target.value);
    };

    const handleSpeak = () => {
        // TODO
        console.log("handleSpeak is called")
        setIsReadingClicked(true)
    }

    // Placeholder functions for button actions
    const handleFileUpload = () => {
        fileInputRef.current.click();
    };

    const handleSummarize = async () => {
        // Submit logic will go here
        if (!text.trim()) return;

        setIsLoading(true);
        setIsSubmitted(true); // Trigger animations and state changes
        // Animation
        setHeight("10%");
        console.log("sending text of length" + text.length);

        const context = constructVocabContext(vocabLevel);
        try {
            // Request Summary
            const response = await createSummarizeResponseService().post({
                message: text.trim(),
                context: {
                    harmContext:harmContext,
                    vocabLevelContext: context
                }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch summary");
            }

            const summaryText = await response.text(); // Assuming BE returns plain text
            setSummary(summaryText); // Display the summary in the new textbox
        } catch (error) {
            setErrorMessage("Failed to generate summary. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target === null) {
                    setText("");
                } else {
                    const result = e.target?.result;
                    if (typeof result === "string") {
                        setText(result); // Safely set the state
                    } else {
                        console.error("FileReader result is not a string");
                    }
                }
            };
            reader.readAsText(file);
        }
    };

    return (
        <div id="summary-screen">
            <div className={`flex-box ${isSubmitted ? "shrink-outer" : ""}`}>
                <input type="file" ref={fileInputRef} style={{display: 'none'}}
                    accept=".txt" onChange={handleFileChange}/>
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
                                options={vocabLevelArray.map(item => item.level)}
                                value={vocabLevel}
                                onChange={handleVocabLevelChange}
                            />
                            {!isLoading && <SubmitButton label="" onClick={handleSummarize} />} 
                            {isLoading && <Loading size={35}/>}
                        </div>
                    </div>
                </div>
            </div>
            {isSubmitted && (
                <div className="flex-box">
                    <div id="summary-output-container">
                        <div id="summary-title-wrapper">
                            <div id="summary-title" className="center-text disable-selection">
                                <h1>Summarized Text</h1>
                            </div>
                            <div id="summary-speaker">
                                {/* Speaker icon button here */}
                                <SpeakerButton label="" onClick={handleSpeak}/>
                            </div>
                        </div>
                        <div id="smaller-container" className="hide-caret">
                            {isLoading ? (
                                <p>Loading...</p> // Replace with a spinner
                            ): errorMessage ? (
                                <p className="error">{errorMessage}</p>
                              ) : (
                                <TextBox value={summary} onChange={() => {}} placeholder="Summary will appear here..."/>
                              )}
                            
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SummaryScreen;
