import React from "react";
import {Link, useNavigate} from "react-router-dom";
import Icon from "../assets/icon.png"
import "./HomeScreen.css";
import RightBackground from "../assets/home-back.png"
import SingleLineTextButton from "../components/atom/SingleLineTextButton";
import DoubleLineTextButton from "../components/atom/DoubleLineTextButton";

interface HomeScreenProps {
    openSettingsModal: () => void;
}

/**
 * Home screen for root path. Contains logo, title and some buttons for quick navigation into features
 * @author Khoa Nguyen
 * @author Ryan Quinn
 */
const HomeScreen: React.FC<HomeScreenProps> = ({openSettingsModal}) => {
    const navigate = useNavigate();

    const customizeExperienceClick = () => {
        navigate("/summary");
        openSettingsModal();
    };
    return (
        <div id="home-pane">
            <div id="home-pane-left">
                <img className="icon" id="home-icon" src={Icon}/>
                <a id="home-title">ReadEase</a>
                <a id="home-subtitle">An Assistive Learning Platform for Dyslexia</a>
                <button id="home-customize-btn" className="link button" onClick={customizeExperienceClick}>
                    <SingleLineTextButton onClick={() => {}} text={"Customize Your Experience"} height={60} width={300}/>
                </button>
            </div>
            <div id="home-pane-right">
                <a id="home-feature">Core Features</a>
                <Link className="link home-feature-btn" to="/summary">
                    <DoubleLineTextButton onClick={() => {}}
                                          headerText={"Summarization"} indentation={"left"}
                                          descText={"to break down lengthy passages into simple, digestible summaries."}
                                          height={90} width={500} outlined={true} inverseColor={true} textSize={15}/>
                </Link>
                <Link className="link home-feature-btn" to="/readaloud">
                    <DoubleLineTextButton onClick={() => {}} indentation={"left"}
                                          headerText={"Text-to-Speech"}
                                          descText={"to convert text into audio, making reading easier and more accessible."}
                                          height={90} width={500} outlined={true} inverseColor={true} textSize={15}/>
                </Link>
            </div>
        </div>
    );
};

export default HomeScreen;