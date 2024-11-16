import React, {ChangeEvent, useState, useEffect} from "react";
import AlloyVoice from "../assets/voices/alloy.wav"
import EchoVoice from "../assets/voices/echo.wav"
import FableVoice from "../assets/voices/fable.wav"
import NovaVoice from "../assets/voices/nova.wav"
import OnyxVoice from "../assets/voices/onyx.wav"
import ShimmerVoice from "../assets/voices/shimmer.wav"
import DaddyVoice from "../assets/voices/daddy.mp3"
import PlayVoiceButton from "./PlayVoiceButton";
import Dropdown from "./atom/Dropdown";
import './DemoVoiceBar.css';

const DemoVoiceBar: React.FC = () => {
    const [soundPath, setSoundPath] = useState<string>("");
    const [selectedVoice, setSelectedVoice] = useState<string | null>(localStorage.getItem('settings-voice'));

    const setVoice = (voice: string | null) => {
        if (voice === "Shimmer") {
            setSoundPath(ShimmerVoice);
        } else if (voice === "Echo") {
            setSoundPath(EchoVoice);
        } else if (voice === "Fable") {
            setSoundPath(FableVoice);
        } else if (voice === "Nova") {
            setSoundPath(NovaVoice);
        } else if (voice === "Onyx") {
            setSoundPath(OnyxVoice);
        } else if (voice === "Alloy") {
            setSoundPath(AlloyVoice);
        } else {
            setSoundPath(DaddyVoice);
        }
    }

    useEffect(() => {
        setVoice(selectedVoice)
    }, [selectedVoice]);

    const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        localStorage.setItem('settings-voice', event.target.value);
        setSelectedVoice(event.target.value)
        setVoice(event.target.value);
    };

    const options = ["Alloy", "Echo", "Fable", "Nova", "Onyx", "Shimmer", "Daddy"];

    return (
        <div id="demo-voice-bar">
            <Dropdown width="70%" options={options} value={selectedVoice} onChange={handleSelect}/>
            <PlayVoiceButton soundPath={soundPath}/>
        </div>
    );
};

export default DemoVoiceBar;