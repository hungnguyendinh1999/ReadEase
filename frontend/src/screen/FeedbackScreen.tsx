import React, { ChangeEvent, useState } from "react";
import RowRadioButtons from "../components/molecules/RowRadioButtons";
import SingleLineTextButton from "../components/atom/SingleLineTextButton";
import TextBox from "../components/atom/TextBox";
import "./FeedbackScreen.css";

const FeedbackFormScreen: React.FC = () => {
    const [text, setText] = useState<string>("");
    const [responses, setResponses] = useState<{ [key: string]: string }>({
        question1: "",
        question2: "",
        question3: "",
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

    const handleSubmit = () => {
        const feedback = {
            ...responses,
            additionalFeedback: text,
          };
        console.log(feedback)
    }

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
            <div id="feedback-form">
                <RowRadioButtons
                    question="How satisfied are you with the app's features?"
                    options={options}
                    name="question1"
                    selectedValue={responses.question1}
                    onChange={(value) =>
                        handleResponseChange("question1", value)
                    }
                />
                <RowRadioButtons
                    question="Is the app easy to navigate?"
                    options={options}
                    name="question2"
                    selectedValue={responses.question2}
                    onChange={(value) =>
                        handleResponseChange("question2", value)
                    }
                />
                <RowRadioButtons
                    question="Is the app easy to navigate?"
                    options={options}
                    name="question3"
                    selectedValue={responses.question3}
                    onChange={(value) =>
                        handleResponseChange("question3", value)
                    }
                />
                <h1>What else is on your mind?</h1>
                <div id={"feedback-input-container"} style={{ width: "100%" }}>
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
        </div>
    );
};

export default FeedbackFormScreen;
