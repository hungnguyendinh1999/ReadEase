import React, { ChangeEvent, useState } from "react";
import RowRadioButtons from "../components/molecules/RowRadioButtons";
import SingleLineTextButton from "../components/atom/SingleLineTextButton";
import TextBox from "../components/atom/TextBox";
import "./FeedbackScreen.css";
import { createFeedbackResponseService } from "../services/backend-service";

const FeedbackFormScreen: React.FC = () => {
    const [text, setText] = useState<string>("");
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [responses, setResponses] = useState<{ [key: string]: string }>({
        summarizationScore: "",
        ttsScore: "",
        customizationScore: "",
    });

    const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    };

    const handleResponseChange = (questionKey: string, value: string) => {
        setResponses((prev) => ({
            ...prev,
            [questionKey]: value,
        }));
    };

    const isFormComplete = () => {
        // Check if all questions have been answered
        return Object.values(responses).every(
            (response) => response.trim() !== ""
        );
    };

    const handleSubmit = async () => {
        // Check for missing fields
        if (!isFormComplete()) {
            setErrorMessage(
                "Please answer all the questions before submitting."
            );
            return;
        }

        // If all fields are answered
        setIsSubmitted(true);

        try {
            const response = await createFeedbackResponseService().post({
                summarizationScore: responses.summarizationScore,
                ttsScore: responses.ttsScore,
                customizationScore: responses.customizationScore,
                other: text.trim(),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch reponse");
            }

            console.log("Success!");
        } catch (error) {
            setErrorMessage(
                "Failed to save your response. Please try again later."
            );
        }
    };

    const options = [
        "Very Satisfied",
        "Satisfied",
        "Neutral",
        "Unsatisfied",
        "Very Unsatisfied",
    ];

    return (
        <div id="feedback-screen">
            <div>
                <h1>We value your Feedback</h1>
                Your feedback makes this product possible, and we strive to
                continuously improve it!
            </div>
            {!isSubmitted ? (
                <>
                    <div id="feedback-form">
                        <RowRadioButtons
                            question="How satisfied are you with the summarization feature?"
                            options={options}
                            name="summarizationScore"
                            selectedValue={responses.summarizationScore}
                            onChange={(value) =>
                                handleResponseChange(
                                    "summarizationScore",
                                    value
                                )
                            }
                        />
                        <RowRadioButtons
                            question="How satisfied are you with the read aloud feature?"
                            options={options}
                            name="ttsScore"
                            selectedValue={responses.ttsScore}
                            onChange={(value) =>
                                handleResponseChange("ttsScore", value)
                            }
                        />
                        <RowRadioButtons
                            question="How satisfied are you with the variety of the customization choices?"
                            options={options}
                            name="customizationScore"
                            selectedValue={responses.customizationScore}
                            onChange={(value) =>
                                handleResponseChange(
                                    "customizationScore",
                                    value
                                )
                            }
                        />
                        {errorMessage && (
                            <p style={{ color: "red", marginTop: "10px" }}>
                                {errorMessage}
                            </p>
                        )}
                        <h1>What else is on your mind?</h1>
                        <div
                            id={"feedback-input-container"}
                            style={{ width: "100%" }}
                        >
                            <div id="feedback-textbox-container">
                                {/* Use custom TextBox component */}
                                <TextBox
                                    value={text}
                                    onChange={handleTextChange}
                                    placeholder="Tell us if you have any additional feedback!"
                                />
                            </div>
                        </div>
                        <div className="right-aligned-box">
                            <SingleLineTextButton
                                onClick={handleSubmit}
                                text={"Submit"}
                                textSize={12}
                                height={48}
                                width={100}
                            />
                        </div>
                    </div>
                </>
            ) : (
                <div className="feedback-completed">
                    <h2>Thank you!</h2>
                    <p>Your feedback has been successfully submitted.</p>
                </div>
            )}
        </div>
    );
};

export default FeedbackFormScreen;
