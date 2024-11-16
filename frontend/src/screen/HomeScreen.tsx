import React from "react";
import {Link} from "react-router-dom";
import Icon from "../assets/icon.png"
import "./HomeScreen.css";
import RightBackground from "../assets/home-back.png"

const HomeScreen: React.FC = () => {
    return (
        <div id="home-pane">
            <div id="home-pane-left">
                <img className="icon" id="home-icon" src={Icon}/>
                <p id="home-title">ReadEase</p>
                <p id="home-subtitle">An Assistive Learning Platform for Dyslexia</p>
                <Link id="home-customize-btn" className="link button" to="/setting">
                    <p>Customize Your Experience</p>
                </Link>
            </div>
            <div id="home-pane-right">
                <p id="home-feature">Core Features</p>
                <Link className="link home-feature-btn" to="/summary">
                    <p className="home-feature-title">Summarization</p>
                    <p className="home-feature-desc">to break down lengthy passages into simple, digestible
                        summaries.</p>
                </Link>
                <Link className="link home-feature-btn" to="/readaloud">
                    <p className="home-feature-title">Text-to-Speech</p>
                    <p className="home-feature-desc">to convert text into audio, making reading easier and more
                        accessible.</p>
                </Link>
            </div>
        </div>
    );
};

export default HomeScreen;