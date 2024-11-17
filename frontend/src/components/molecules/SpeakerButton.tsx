import React, {FC} from 'react';
import './SubmitTextButton.css'
import IconButton from '../atom/IconButton';
import ReadIcon from '../../assets/read-speak.png';
import "./SpeakerButton.css"

interface SpeakerButtonProps {
    label?: string;
    onClick: () => void;
}

const SpeakerButton: FC<SpeakerButtonProps> = ({label = 'Read Text', onClick}) => {
    return <IconButton label={label} onClick={onClick} iconSrc={ReadIcon} className="speaker-button"/>;
};

export default SpeakerButton;