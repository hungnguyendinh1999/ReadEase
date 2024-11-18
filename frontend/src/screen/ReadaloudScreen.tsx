import React, {useState, ChangeEvent, FC, useRef, useEffect} from "react";
import "./ReadaloudScreen.css";
import TextBox from "../components/atom/TextBox";
import UploadFileButton from "../components/molecules/UploadFileButton";
import ToSpeechButton from "../components/molecules/ToSpeechButton";
import PlayVoiceButton from "../components/molecules/PlayVoiceButton";
import Loading from "../components/atom/Loading";
import {createDummyTTSResponseService, createTTSResponseService} from "../services/backend-service";
import { useSettings } from "../contexts/SettingsContext";

const ReadaloudScreen: FC = () => {
    const {voice} = useSettings();

    const fileInputRef = useRef(null);
    const [text, setText] = useState<string>("");
    const [isToSpeech, setIsToSpeech] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [soundPath, setSoundPath] = useState<string>("");
    const [responseStream, setResponseStream] = useState(null); // The most recent query response

    // Event handler for textarea input
    const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
        setIsToSpeech(false);
    };

    // Placeholder functions for button actions
    const handleFileUpload = () => {
        fileInputRef.current.click();
    };

    const handleToSpeech = async () => {
        if (text !== "") {
            setIsLoading(true);
            const response = await createDummyTTSResponseService().post({message: text, voice: voice.toLowerCase()});
            setResponseStream(response);
            if (!response.ok) {
                throw new Error("Failed to fetch audio");
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setSoundPath(url);
        }
    };

    useEffect(() => {
        setIsLoading(false);
        if (responseStream !== null && responseStream.status === 200) {
            setIsToSpeech(true);
        }
    }, [responseStream]);

    useEffect(() => {
        setIsToSpeech(false);
    }, [voice]);

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
                        setText(result); // Safely set the state
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
        <div id="summary-screen">
            <div id="flex-box">
                <input type="file" ref={fileInputRef} style={{display: 'none'}}
                    accept=".txt" onChange={handleFileChange}/>
                <div id="readalout-container">
                    <div id="readalout-textbox">
                        {/* Use custom TextBox component */}
                        <TextBox
                            value={text} onChange={handleTextChange}
                            placeholder="Type text here, or upload a txt file, then press the synthesis button on the bottom right to start."
                        />
                    </div>

                    {/* Button Group */}
                    <div id="readalout-button-group">
                        {/* Left aligned button */}
                        <div id="readalout-left-buttons">
                            <UploadFileButton label="Upload File" onClick={handleFileUpload} />
                        </div>

                        {/* Right aligned button */}
                        <div id="readalout-right-buttons">
                            {isLoading && !isToSpeech && <Loading size={35}/>}
                            {!isLoading && isToSpeech && <PlayVoiceButton soundPath={soundPath} pauseOnToggle={true}
                                                            inverseColor={true} size={35}/>}
                            {!isLoading && !isToSpeech && <ToSpeechButton onClick={handleToSpeech} inverseColor={true}/>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReadaloudScreen;
