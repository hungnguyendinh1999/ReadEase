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

interface DemoVoiceBarProps {
    voice: string;
    onChange: (voice: string) => void;
}

const DemoVoiceBar: React.FC<DemoVoiceBarProps> = ({voice, onChange}) => {
    const [soundPath, setSoundPath] = useState<string>("");
    const [selectedVoice, setSelectedVoice] = useState<string>(voice);

    const setVoice = (voice: string) => {
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
        } else {
            setSoundPath(AlloyVoice);
        }
    }

    useEffect(() => {
        setVoice(selectedVoice)
    }, [selectedVoice]);

    const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedVoice(event.target.value)
        setVoice(event.target.value);
        onChange(event.target.value);
    };

    const options = ["Alloy", "Echo", "Fable", "Nova", "Onyx", "Shimmer"];

    return (
        <div id="demo-voice-bar">
            <Dropdown width="70%" options={options} value={selectedVoice} onChange={handleSelect}/>
            <PlayVoiceButton soundPath={soundPath}/>
        </div>
    );
};

export default DemoVoiceBar;