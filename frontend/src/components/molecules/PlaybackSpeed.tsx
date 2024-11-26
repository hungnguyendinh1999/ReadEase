import React, {useState} from "react";
import Dropdown from "../atom/Dropdown";

interface PlaybackSpeedProps {
    audioRef: React.RefObject<HTMLAudioElement>; // Reference to the audio element
}

/**
 * Component to adjust audio playback speed
 * @author Khoa Nguyen
 *
 * @param audioRef Reference to the audio element
 */
const PlaybackSpeed: React.FC<PlaybackSpeedProps> = ({ audioRef }) => {
    // Available speed options
    const speedOptions = ["0.5", "1", "1.5", "2"]; // Speeds: 0.5x, 1x (normal), 1.5x, 2x
    const [currentSpeed, setCurrentSpeed] = useState("1");

    const handleSpeedChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const audio = audioRef.current;
        setCurrentSpeed(event.target.value)
        if (audio) {
            audio.playbackRate = parseFloat(event.target.value);
        }
    };

    return (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Dropdown options={speedOptions} value={currentSpeed} onChange={handleSpeedChange}/>
        </div>
    );
};

export default PlaybackSpeed;