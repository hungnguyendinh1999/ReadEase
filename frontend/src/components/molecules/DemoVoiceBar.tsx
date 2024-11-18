import React, {ChangeEvent, useState, useEffect} from "react";
import AlloyVoice from "../../assets/voices/alloy.wav"
import EchoVoice from "../../assets/voices/echo.wav"
import FableVoice from "../../assets/voices/fable.wav"
import NovaVoice from "../../assets/voices/nova.wav"
import OnyxVoice from "../../assets/voices/onyx.wav"
import ShimmerVoice from "../../assets/voices/shimmer.wav"
import DaddyVoice from "../assets/voices/daddy.mp3"
import PlayVoiceButton from "./PlayVoiceButton";
import Dropdown from "../atom/Dropdown";
import './DemoVoiceBar.css';

interface DemoVoiceBarProps {
    voice: string;
    onChange: (voice: string) => void;
}

/**
 * A bar that allows user to select a voice from a dropdown list. The play button next to the dropdown will load
 * the appropriate media so user can try out the voices.
 * @author Khoa Nguyen
 *
 * @param voice currently chosen voice
 * @param onChange function when new voice is selected
 */
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

    // Detects when a new voice is selected, determine what voice file to load into the media button
    useEffect(() => {
        setVoice(selectedVoice)
    }, [selectedVoice]);

    // Detect when new voice is selected. Update local and parents
    const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedVoice(event.target.value)
        onChange(event.target.value);
    };

    // List of available voices, provided by OpenAI
    const options = ["Alloy", "Echo", "Fable", "Nova", "Onyx", "Shimmer"];

    return (
        <div id="demo-voice-bar">
            <Dropdown width="70%" options={options} value={selectedVoice} onChange={handleSelect}/>
            <PlayVoiceButton soundPath={soundPath}/>
        </div>
    );
};

export default DemoVoiceBar;