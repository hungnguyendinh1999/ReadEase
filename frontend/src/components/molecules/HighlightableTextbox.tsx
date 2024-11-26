import React, { useState, useRef, useEffect } from "react";
import Modal from "./Modal";
import getCaretCoordinates from "textarea-caret";
import "./HighlightableTextBox.css";
import { vocabLevels, getInstructionForLevel } from "../../utils/VocabLevels";
import { useSettings } from "../../contexts/SettingsContext";
import { createProcessResponseService } from "../../services/backend-service"

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

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);

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

    return (
        <div className="highlightable-textbox-wrapper">
            <textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
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
                    <button onClick={() => handleAIOption("Explain This")}>Explain This</button>
                    <button onClick={() => handleAIOption("Define This")}>Define This</button>
                    <button onClick={() => handleAIOption("Simplify This")}>Simplify This</button>
                    <button onClick={() => handleAIOption("Rewrite This", "Simpler")}>Rewrite (Simpler)</button>
                    <button onClick={() => handleAIOption("Rewrite This", "More Formal")}>Rewrite (More Formal)</button>
                    <button onClick={() => handleAIOption("Rewrite This", "More Creative")}>Rewrite (More Creative)</button>
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
