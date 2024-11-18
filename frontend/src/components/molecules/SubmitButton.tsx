import React, {FC} from 'react';
import IconButton from '../atom/IconButton';
import submitIcon from '../../assets/submit-plane.png';

interface SubmitButtonProps {
    onClick: () => void;
    inverseColor?: boolean;
}

const SubmitButton: FC<SubmitButtonProps> = ({onClick, inverseColor = false}) => {
    return <IconButton onClick={onClick} iconSrc={submitIcon} className="submit-text-button" size={40} iconSize={55} isCircular={false} inverseColor={inverseColor}/>;
};

export default SubmitButton;