import React, {useState, useRef, useEffect} from "react";
import "./PlayVoiceButton.css";
import PlayIcon from "../assets/play.png"
import PauseIcon from "../assets/pause.png"
import StopIcon from "../assets/stop.png"

interface PlayVoiceButtonProps {
    soundPath: string;
    pauseOnToggle?: boolean;
    playIcon?: string;
    pauseIcon?: string;
    stopIcon?: string;
}

const PlayVoiceButton: React.FC<PlayVoiceButtonProps> = ({soundPath, pauseOnToggle = false,
                                                             playIcon = PlayIcon, pauseIcon = PauseIcon, stopIcon = StopIcon}) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [label, setLabel] = useState(playIcon);
    const [isAudioLoaded, setIsAudioLoaded] = useState(false);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isAudioLoaded) {
                if (isPlaying) {
                    if (!pauseOnToggle) {
                        audioRef.current.currentTime = 0;
                    }
                    audioRef.current.pause();
                    setLabel(playIcon)
                    setIsPlaying(false);
                } else {
                    audioRef.current.play();
                    setIsPlaying(true);
                    if (pauseOnToggle) {
                        setLabel(pauseIcon);
                    } else {
                        setLabel(stopIcon);
                    }
                }
            } else {
                audioRef.current.load();
            }
        }
    };

    const handleCanPlay = () => {
        setIsAudioLoaded(true);
    };

    // Handle when audio is completed
    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            const handleEnded = () => {
                setIsPlaying(false);
                setLabel(playIcon);
            }
            audio.addEventListener("ended", handleEnded);
            return () => {
                audio.removeEventListener("ended", handleEnded);
            };
        }
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.load();
            setIsPlaying(false);
            setLabel(playIcon)
        }
    }, [soundPath]);

    return (
        <div id="voice-btn" className="button-img" onClick={togglePlay}>
            <img src={label}/>
            <audio onCanPlay={handleCanPlay} ref={audioRef} src={soundPath}/>
        </div>
    );
};

export default PlayVoiceButton;
