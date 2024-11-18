import React, {useState, useRef, useEffect} from "react";
import PlayIcon from "../../assets/play.png"
import PauseIcon from "../../assets/pause.png"
import StopIcon from "../../assets/stop.png"
import PlayBIcon from "../../assets/play-black.png"
import PauseBIcon from "../../assets/pause-black.png"
import StopBIcon from "../../assets/stop-black.png"
import IconButton from "../atom/IconButton";

interface PlayVoiceButtonProps {
    soundPath: string;
    pauseOnToggle?: boolean;
    inverseColor?: boolean;
    size?: number;
}

const PlayVoiceButton: React.FC<PlayVoiceButtonProps> = ({soundPath, pauseOnToggle = false, inverseColor = false, size = 30}) => {
    const playIcon = inverseColor ? PlayBIcon : PlayIcon;
    const pauseIcon = inverseColor ? PauseBIcon : PauseIcon;
    const stopIcon = inverseColor ? StopBIcon : StopIcon;

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
        <div>
            <audio style={{visibility: "collapse"}} onCanPlay={handleCanPlay} ref={audioRef} src={soundPath}/>
            <IconButton onClick={togglePlay} iconSrc={label} size={size} iconSize={40} inverseColor={inverseColor}/>
        </div>
    );
};

export default PlayVoiceButton;
