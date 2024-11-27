import React, { useState, useRef, useEffect } from "react";
import Modal from "./Modal";
import getCaretCoordinates from "textarea-caret";
import "./HighlightableTextbox.css";
import { vocabLevels, getInstructionForLevel } from "../../utils/VocabLevels";
import { useSettings } from "../../contexts/SettingsContext";
import {
    createHarmfulValidationService,
    createProcessResponseService,
    createTTSResponseService
} from "../../services/backend-service"
import SingleLineTextButton from "../atom/SingleLineTextButton";
import ToSpeechButton from "./ToSpeechButton";
import PlayVoiceButton from "./PlayVoiceButton";
import Loading from "../atom/Loading";

interface HighlightableTextBoxProps {
    placeholder?: string;
    rows?: number;
    value?: string;
    readonly?: boolean;
    onChange?: (newValue: string) => void;
}

const harmContext =
    "If the input text contains harmful, illegal, or otherwise offensive content, then do not perform this request and give a couple word explanation.";

const HighlightableTextBox: React.FC<HighlightableTextBoxProps> = ({
                                placeholder = "Type something here...",
                                rows = 5,
                                value = "",
                                readonly = false,
                                onChange,
                            }) => {
    const [history, setHistory] = useState<string[]>([]);
    const [previousText, setPreviousText] = useState<string>("");
    const [highlightedText, setHighlightedText] = useState<string | null>(null);
    const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
    const [showPopup, setShowPopup] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalResponse, setModalResponse] = useState<string>("");
    const [selectedOption, setSelectedOption] = useState<string>("");
    const { vocabLevel } = useSettings();

    const [soundPath, setSoundPath] = useState<string>("");
    const [responseStream, setResponseStream] = useState(null);
    const [isToSpeech, setIsToSpeech] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {voice} = useSettings();

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);

    const handleTextChange = (newValue: string) => {
        setHistory((prevHistory) => [...prevHistory, value]);
        onChange?.(newValue);
        setIsToSpeech(false);
        setIsLoading(false);
    };

    const handleKeyUp = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Tab") {
            // Do not deselect text when tabbing
        } else {
            handleTextSelection(event as unknown as KeyboardEvent);
        }
    };

    const handleClickAway = (event: MouseEvent) => {
        if (
            popupRef.current?.contains(event.target as Node) ||
            textareaRef.current?.contains(event.target as Node)
        ) {
            return;
        }
        setShowPopup(false);
    };

    const handleTextSelection = (event: MouseEvent | KeyboardEvent) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        setIsToSpeech(false);
        setIsLoading(false);

        const selectionStart = textarea.selectionStart;
        const selectionEnd = textarea.selectionEnd;

        if (selectionStart !== selectionEnd) {
            const selectedText = value.slice(selectionStart, selectionEnd);
            setPreviousText(highlightedText || "");
            setHighlightedText(selectedText);

            const textareaRect = textarea.getBoundingClientRect();

            let x, y;

            if (event instanceof MouseEvent) {
                x = event.clientX + window.scrollX - window.scrollX;
                y = event.clientY + window.scrollY - window.scrollY;
            } else {
                const caretCoordinates = getCaretCoordinates(
                    textarea,
                    event.shiftKey && selectionStart > selectionEnd
                        ? selectionStart
                        : selectionEnd
                );
                const { top, left, height } = caretCoordinates;

                x = textareaRect.left + window.scrollX + left;
                y =
                    textareaRect.top +
                    window.scrollY -
                    textarea.scrollTop +
                    (selectionStart > selectionEnd ? top : top + height);
            }

            // Adjust popup position to fit within the window
            const popupWidth = 390;
            const popupHeight = 50;
    
            if (x + popupWidth > window.innerWidth) {
                x = window.innerWidth - popupWidth;
            }
            if (y + popupHeight > window.innerHeight) {
                y = window.innerHeight - popupHeight;
            }

            setPopupPosition({ x, y });
            setShowPopup(true);
        } else {
            setShowPopup(false);
        }
    };

    const handleScroll = () => {
        setShowPopup(false);
    };

    const handleAIOption = async (option: string, style: string = "default") => {
        setSelectedOption(option);
        setShowPopup(false);
        
        if (!(option === "Rewrite This")) {
            setModalOpen(true);
        }
    
        // Map option to backend types
        const optionToType = {
            "Explain This": "explain",
            "Define This": "define",
            "Simplify This": "simplify",
            "Rewrite This": "rewrite"
        };
    
        const type = optionToType[option as keyof typeof optionToType];
        if (!type) {
            setModalResponse("Invalid option selected.");
            return;
        }
    
        try {
            const vocabInstruction = getInstructionForLevel(vocabLevel);
            console.log(vocabInstruction);
            // Request tool
            const response = await createProcessResponseService().post({
                text: highlightedText,
                context: harmContext,
                vocabLevel: vocabInstruction,
                type: type,
                style: style,
            });

            console.log(response);

            if (!response.ok) {
                throw new Error("Failed to fetch tool");
            }

            const data = await response.text();
            setModalResponse(data);

            if (textareaRef.current && option === "Rewrite This") {
                const textarea = textareaRef.current;
                const selectionStart = textarea.selectionStart;
                const selectionEnd = textarea.selectionEnd;
    
                // Replace the selected text
                const updatedValue =
                    value.slice(0, selectionStart) + data + value.slice(selectionEnd);
                
                setHistory((prevHistory) => [...prevHistory, value]);
    
                // Update the value via the `onChange` prop
                onChange?.(updatedValue);
    
                // Reset the highlighted text
                setHighlightedText(null);
            }
        } catch (error) {
            console.error("Error fetching AI response:", error);
            setModalResponse("An error occurred while processing your request.");
        }
            
    };

    const handleUndo = () => {
        if (history.length > 0) {
            const lastValue = history.pop()!;
            onChange?.(lastValue);
            setHistory([...history]);
        }
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key === "z") {
                event.preventDefault(); // Prevent browser undo
                handleUndo();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [history]);

    useEffect(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        textarea.addEventListener("mouseup", handleClickAway);
        textarea.addEventListener("keyup", handleTextSelection);
        textarea.addEventListener("scroll", handleScroll);
        document.addEventListener("mousedown", handleClickAway);

        return () => {
            textarea.removeEventListener("mouseup", handleClickAway);
            textarea.removeEventListener("keyup", handleTextSelection);
            textarea.removeEventListener("scroll", handleScroll);
            document.removeEventListener("mousedown", handleClickAway);
        };
    }, []);

    // User requests synthesis, we send user's input to our server, and our server will handle communication to OpenAPI
    const handleToSpeech = async () => {
        if (highlightedText !== "") {
            setIsLoading(true);

            let message = highlightedText
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

    return (
        <div className="highlightable-textbox-wrapper">
            <textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder={placeholder}
                rows={rows}
                className="highlightable-textbox"
                readOnly={readonly}
                onMouseUp={handleTextSelection}
                onKeyUp={handleKeyUp}
            />
            {/* Popup menu */}
            {showPopup && (
                <div
                    ref={popupRef}
                    className="highlight-popup"
                    style={{ top: popupPosition.y, left: popupPosition.x }}
                >
                    <div className="highlight-group">
                        {!isLoading && !isToSpeech && <ToSpeechButton onClick={handleToSpeech}/>}
                        {!isLoading && isToSpeech && <PlayVoiceButton soundPath={soundPath} pauseOnToggle={true} size={45}/>}
                        {isLoading && !isToSpeech && <Loading size={45} inverseColor={true}/>}
                        <SingleLineTextButton onClick={() => handleAIOption("Explain This")} text="Explain This" height={45} width={100} textSize={12}/>
                        <SingleLineTextButton onClick={() => handleAIOption("Define This")} text="Define This" height={45} width={100} textSize={12}/>
                        <SingleLineTextButton onClick={() => handleAIOption("Simplify This")} text="Simplify This" height={45} width={110} textSize={12}/>
                    </div>
                    {!readonly &&
                        <div className="highlight-group">
                            <SingleLineTextButton onClick={() => handleAIOption("Rewrite This", "Simpler")} text="Rewrite (Simpler)" height={45} width={130} textSize={12}/>
                            <SingleLineTextButton onClick={() => handleAIOption("Rewrite This", "More Formal")} text="Rewrite (More Formal)" height={45} width={160} textSize={12}/>
                            <SingleLineTextButton onClick={() => handleAIOption("Rewrite This", "More Creative")} text="Rewrite (More Creative)" height={45} width={168} textSize={12}/>
                        </div>
                    }
                </div>
            )}
            {/* Modal for AI response */}
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <h2>AI Options</h2>
                <p><strong>Selected Text:</strong> {highlightedText}</p>
                <p><strong>Selected Option:</strong> {selectedOption}</p>
                <div>
                    <h3>AI Response:</h3>
                    <p>{modalResponse || "Loading..."}</p>
                </div>
            </Modal>
        </div>
    );
};

export default HighlightableTextBox;
