import React, {useState, ChangeEvent, FC, useRef, useEffect} from "react";
import "./SummaryScreen.css";
import TextBox from "../components/atom/TextBox";
import UploadFileButton from "../components/molecules/UploadFileButton";
import SubmitButton from "../components/molecules/SubmitButton";
import Dropdown from "../components/atom/Dropdown";
import {createSummarizeResponseService, createTTSResponseService} from "../services/backend-service"
import Loading from "../components/atom/Loading";
import PlayVoiceButton from "../components/molecules/PlayVoiceButton";
import {useSettings} from "../contexts/SettingsContext";
import Typewriter from "../components/atom/Typewriter";
import BackButton from "../components/molecules/BackButton";

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

/**
 * Summarize screen, allows user to input text and ask the system to summarize for the text for them.
 * The process should go: input text -> summarize (OpenAI API request) -> synthesis (OpenAI API request)
 * @author Hung Nguyen
 * @author Khoa Nguyen
 */
const SummaryScreen: FC = () => {
    // Define state with types
    const fileInputRef = useRef(null);
    const [text, setText] = useState<string>("");
    const [vocabLevel, setVocabLevel] = useState<string>("Default");
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [width, setWidth] = useState<string>("90%");
    const [summary, setSummary] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const {voice} = useSettings();
    const [soundPath, setSoundPath] = useState<string>("");
    const [responseTTSStream, setResponseTTSStream] = useState(null);
    const [isToSpeech, setIsToSpeech] = useState<boolean>(false);
    

    // Event handler for textarea input
    const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    };

    // Event handler for Vocab Level
    const handleVocabLevelChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setVocabLevel(event.target.value);
    };

    // Request file upload dialog
    const handleFileUpload = () => {
        fileInputRef.current.click();
    };

    // Summarize requests synthesis, we send user's input to our server, and our server will handle communication to OpenAPI
    const ttsSynth = async (summaryText) => {
        setIsToSpeech(false);
        if (summaryText !== null && summaryText !== "") {
            const ttsResponse = await createTTSResponseService().post({message: summaryText, voice: voice.toLowerCase()});
            setResponseTTSStream(ttsResponse);
            if (!ttsResponse.ok) {
                throw new Error("Failed to fetch audio");
            }

            const blob = await ttsResponse.blob();
            const url = URL.createObjectURL(blob);
            setSoundPath(url);
        }
    }

    // Detects if the response from server is received. If yes, we allow user to play the audio
    useEffect(() => {
        if (responseTTSStream !== null && responseTTSStream.status === 200) {
            setIsToSpeech(true);
        }
    }, [responseTTSStream]);

    // Detects if user change to different voice in the settings. We want the voice to accurately reflect what user
    // chose, this part is automatically, since the synthesis is part of the summarize process
    useEffect(() => {
        ttsSynth(summary)
    }, [voice]);

    const handleSummarize = async () => {
        // Submit logic will go here
        if (!text.trim()) return;

        setIsLoading(true);
        setIsSubmitted(true); // Trigger animations and state changes
        setIsToSpeech(false);
        // Animation
        setWidth("45%");

        const vocabString = vocabLevelArray.find((option) => option.level === vocabLevel).instruction;
        try {
            // Request Summary
            const response = await createSummarizeResponseService().post({
                message: text.trim(),
                context: harmContext,
                vocabLevel: vocabString,
            });

            if (!response.ok) {
                throw new Error("Failed to fetch summary");
            }

            const summaryText = await response.text(); // Assuming BE returns plain text
            setSummary(summaryText); // Display the summary in the new textbox
            await ttsSynth(summaryText);
        } catch (error) {
            setErrorMessage("Failed to generate summary. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Handle file read
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
                        setText(result);
                    } else {
                        console.error("FileReader result is not a string");
                    }
                }
            };
            reader.readAsText(file);
        }
    };

    // Handle back button from finish summarizing back to the start
    const backButton = () => {
        setIsSubmitted(false);
        setWidth("90%");
    }

    return (
        <div id="summary-screen">
            <div className="flex-box">
                <input type="file" ref={fileInputRef} style={{display: 'none'}}
                    accept=".txt" onChange={handleFileChange}/>
                <div id="summary-input-container" style={{width: width}}>
                    <div id="summary-title-wrapper">
                        {!isLoading && !isSubmitted &&
                            <UploadFileButton label="Upload File" onClick={handleFileUpload}/>}
                        <div id="summary-title" className="center-text disable-selection">
                            <p>Source</p>
                        </div>
                        {!isLoading && !isSubmitted &&
                        <Dropdown
                            options={vocabLevelArray.map(item => item.level)}
                            value={vocabLevel}
                            onChange={handleVocabLevelChange}
                        />}
                        {!isLoading && !isSubmitted && <SubmitButton onClick={handleSummarize} inverseColor={true}/>}
                        {isLoading && <Loading size={35}/>}
                    </div>
                    <div id="summary-textbox-container">
                        {/* Use custom TextBox component */}
                        <TextBox
                            value={text}
                            onChange={handleTextChange}
                            placeholder="Type text here, or upload a *.txt file, then choose the vocabulary level and click on the summarize button on the top right to start."
                            readonly={isSubmitted}
                        />
                    </div>
                </div>

                {isSubmitted &&
                    <div id="summary-output-container">
                        <div id="summary-title-wrapper">
                            <BackButton size={35} onClick={backButton} inverseColor={true}/>
                            <div id="summary-title" className="center-text disable-selection">
                                <p>Summary</p>
                            </div>
                            {isToSpeech && <PlayVoiceButton size={35} soundPath={soundPath} pauseOnToggle={true} inverseColor={true}/>}
                        </div>
                        <div id="smaller-container" className="hide-caret">
                            {isLoading ? (
                                <Loading size={30}/>
                            ): errorMessage ? (
                                <p className="error">{errorMessage}</p>
                            ) : (
                                <Typewriter value={summary} speed={4}/>
                            )}

                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default SummaryScreen;
