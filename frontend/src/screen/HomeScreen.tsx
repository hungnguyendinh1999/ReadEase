import React from "react";
import { Link } from "react-router-dom";
import Icon from "../assets/icon.png"
import "./HomeScreen.css";
import RightBackground from "../assets/home-back.png"

const HomeScreen: React.FC = () => {
  return (
    <div id="home-pane">
        <div id="home-pane-left">
          <img className="icon" id="home-icon" src={Icon} />
          <p id="home-title">ReadEase</p>
          <p id="home-subtitle">An Assistive Learning Platform for Dyslexia</p>
          <div class="home-customize-btn">
              <Link className="link" to="/setting">
                <p class="home-customize-btn-title">Customize Your Experience</p>
              </Link>
          </div>
        </div>
        <div id="home-pane-right">
          <p id="home-feature">Core Features</p>
          <div class="home-feature-btn">
              <Link className="link" to="/summary">
                  <p class="home-feature-title">Summarization</p>
                  <p class="home-feature-desc">to break down lengthy passages into simple, digestible summaries.</p>
              </Link>
          </div>
          <div class="home-feature-btn">
              <Link className="link" to="/readaloud">
                  <p class="home-feature-title">Text-to-Speech</p>
                  <p class="home-feature-desc">to convert text into audio, making reading easier and more accessible.</p>
              </Link>
          </div>
        </div>
    </div>
  );
};

export default HomeScreen;