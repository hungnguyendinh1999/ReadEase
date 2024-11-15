import React, {useState, ChangeEvent, FC, useRef, useEffect} from "react";
import "./ReadaloudScreen.css";
import TextBox from "../components/atom/TextBox";
import UploadFileButton from "../components/molecules/UploadFileButton";
import ToSpeechButton from "../components/molecules/ToSpeechButton";
import PlayVoiceButton from "../components/PlayVoiceButton";
import Loading from "../components/Loading";

const ReadaloudScreen: FC = () => {
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
        setIsLoading(true);
        const response = await fetch("http://127.0.0.1:8080/tts?text=" + encodeURIComponent(text));
        setResponseStream(response);
        if (!response.ok) {
            throw new Error("Failed to fetch audio");
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setSoundPath(url);
    };

    useEffect(() => {
        setIsLoading(false);
        if (responseStream !== null && responseStream.status === 200) {
            setIsToSpeech(true);
        }
    }, [responseStream]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target === null) {
                    setText("");
                    setIsToSpeech(false);
                } else {
                    setText(e.target.result);
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
                            placeholder="Type text here, or upload a txt file"
                        />
                    </div>

                    {/* Button Group */}
                    <div id="readalout-button-group">
                        {/* Left aligned button */}
                        <div id="readalout-left-buttons">
                            <UploadFileButton label="Upload File"
                                onClick={handleFileUpload} inverseColor={true}
                            />
                        </div>

                        {/* Right aligned button */}
                        <div id="readalout-right-buttons">
                            {isLoading && !isToSpeech && <Loading size={35}/>}
                            {!isLoading && isToSpeech && <PlayVoiceButton soundPath={soundPath} pauseOnToggle={true}
                                                            inverseColor={true} size={35}/>}
                            {!isLoading && !isToSpeech && <ToSpeechButton label="" onClick={handleToSpeech}/>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReadaloudScreen;
