import React, { useEffect, useState } from "react";
import "./SeekBar.css"

interface SeekBarProps {
    audioRef: React.RefObject<HTMLAudioElement>; // Reference to the audio element
}

/**
 * Seek bar for controlling audio playback
 * @author Khoa Nguyen
 *
 * @param audioRef Reference to the audio element in the PlayVoiceButton
 */
const SeekBar: React.FC<SeekBarProps> = ({ audioRef }) => {
    const [progress, setProgress] = useState(0); // Current progress (0-100)
    const [duration, setDuration] = useState(0); // Audio duration in seconds
    const [currentTime, setCurrentTime] = useState(0); // Current playback time in seconds

    // Update progress bar as the audio plays
    useEffect(() => {
        const audio = audioRef.current;

        if (audio) {
            const updateProgress = () => {
                setCurrentTime(audio.currentTime);
                setProgress((audio.currentTime / audio.duration) * 100 || 0);
            };

            const handleDurationChange = () => {
                setDuration(audio.duration || 0);
            };

            audio.addEventListener("timeupdate", updateProgress);
            audio.addEventListener("durationchange", handleDurationChange);

            return () => {
                audio.removeEventListener("timeupdate", updateProgress);
                audio.removeEventListener("durationchange", handleDurationChange);
            };
        }
    }, [audioRef]);

    // Format time for display
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    // Handle user interaction with the seek bar
    const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
        const audio = audioRef.current;
        if (audio) {
            const newTime = (Number(event.target.value) / 100) * duration;
            audio.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    return (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span className="seek-duration">{formatTime(currentTime)}</span>
            <input
                type="range"
                value={progress}
                onChange={handleSeek}
                style={{ flexGrow: 1 }}
                min="0"
                max="100"
                id="seek-bar"
            />
            <span className="seek-duration">{formatTime(duration)}</span>
        </div>
    );
};


export default SeekBar;