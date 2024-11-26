import React, {useState, ChangeEvent, FC, useRef, useEffect} from "react";
import "./ReadaloudScreen.css";
import TextBox from "../components/atom/TextBox";
import UploadFileButton from "../components/molecules/UploadFileButton";
import ToSpeechButton from "../components/molecules/ToSpeechButton";
import PlayVoiceButton from "../components/molecules/PlayVoiceButton";
import Loading from "../components/atom/Loading";
import {createHarmfulValidationService, createTTSResponseService} from "../services/backend-service";
import { useSettings } from "../contexts/SettingsContext";
import SeekBar from "../components/molecules/SeekBar";
import PlaybackSpeed from "../components/molecules/PlaybackSpeed";
import HighlightableTextBox from "../components/molecules/HighlightableTextbox";
import DisclaimerSection from "../components/molecules/DisclaimerSection";

/**
 * Read Aloud screen, allows user to input text and ask the system to read it out into audio.
 * The process should go: text input -> synthesis (OpenAI API request) -> play tts audio that gets returned
 * @author Khoa Nguyen
 */
const ReadaloudScreen: FC = () => {
    const {voice} = useSettings();
    let audioRef = useRef(null);

    const fileInputRef = useRef(null);
    const [text, setText] = useState<string>("");
    const [isToSpeech, setIsToSpeech] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [soundPath, setSoundPath] = useState<string>("");
    const [responseStream, setResponseStream] = useState(null); // The most recent query response

    // Event handler for when input text changes. This should reset the process from the start, since we want
    // the text to match with the audio at all time
    const handleTextChange = (newValue: string) => {
        setText(newValue);
        setIsToSpeech(false);
    };

    // Request file upload dialog
    const handleFileUpload = () => {
        fileInputRef.current.click();
    };

    // User requests synthesis, we send user's input to our server, and our server will handle communication to OpenAPI
    const handleToSpeech = async () => {
        if (text !== "") {
            setIsLoading(true);

            let message = text
            const responseValidation = await createHarmfulValidationService().post({message: message});
            if (!responseValidation.ok) {
                throw new Error("Failed to fetch audio");
            }
            const validationResult = await responseValidation.json();
            if (validationResult) {
                message = "The input seems to contain harmful context. I cannot provide a text to speech for this."
            }

            const response = await createTTSResponseService().post({message: message, voice: voice.toLowerCase()});
            setResponseStream(response);
            if (!response.ok) {
                throw new Error("Failed to fetch audio");
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setSoundPath(url);
        }
    };

    // Detects if the response from server is received. If yes, we allow user to play the audio
    useEffect(() => {
        setIsLoading(false);
        if (responseStream !== null && responseStream.status === 200) {
            setIsToSpeech(true);
        }
    }, [responseStream]);

    // Detects if user change to different voice in the settings. We want the voice to accurately reflect what user
    // chose, but user still have to press the synthesis button again, just to give them a choice
    useEffect(() => {
        setIsToSpeech(false);
    }, [voice]);

    // Handle file read
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target === null) {
                    setText("");
                    setIsToSpeech(false);
                } else {
                    const result = e.target?.result;
                    if (typeof result === "string") {
                        setText(result);
                    } else {
                        console.error("FileReader result is not a string");
                    }
                    setIsToSpeech(false);
                }
            };
            reader.readAsText(file);
        }
    };

    return (
        <div id="readaloud-screen">
            <div id="flex-box">
                <input type="file" ref={fileInputRef} style={{display: 'none'}}
                    accept=".txt" onChange={handleFileChange}/>
                <div id="readaloud-container">
                    <div id="readaloud-textbox">
                        {/* Use custom TextBox component */}
                        <HighlightableTextBox
                            value={text} onChange={handleTextChange}
                            placeholder="Type text here, or upload a *.txt file, then press the synthesis button on the bottom right to start."
                        />
                    </div>

                    {/* Button Group */}
                    <div id="readaloud-button-group">
                        {/* Left aligned button */}
                        <div id="readaloud-left-buttons">
                            <UploadFileButton label="Upload File" onClick={handleFileUpload} />
                        </div>

                        {/* Right aligned button */}
                        <div id="readaloud-right-buttons">
                            {isLoading && !isToSpeech && <Loading size={35}/>}
                            {!isLoading && isToSpeech && <SeekBar audioRef={audioRef}/>}
                            {!isLoading && isToSpeech && <PlaybackSpeed audioRef={audioRef}/>}
                            {!isLoading && isToSpeech && <PlayVoiceButton audioRef={audioRef}
                                                            soundPath={soundPath} pauseOnToggle={true}
                                                            inverseColor={true} size={35}/>}
                            {!isLoading && !isToSpeech && <ToSpeechButton onClick={handleToSpeech} inverseColor={true}/>}
                        </div>
                    </div>
                </div>
            </div>
            <DisclaimerSection/>
        </div>
    );
};

export default ReadaloudScreen;
