import React, {FC} from 'react';
import './SubmitTextButton.css'
import IconButton from '../atom/IconButton';
import ttsIcon from '../../assets/tts.png';
import "./ToSpeechButton.css"

interface ToSpeechButtonProps {
    label?: string;
    onClick: () => void;
}

const ToSpeechButton: FC<ToSpeechButtonProps> = ({label = 'Submit', onClick}) => {
    return <IconButton label={label} onClick={onClick} iconSrc={ttsIcon} className="to-speech-button"/>;
};

export default ToSpeechButton;