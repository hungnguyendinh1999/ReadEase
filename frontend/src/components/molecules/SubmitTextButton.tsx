import React, { FC } from 'react';
import IconButton from '../atom/IconButton';
import submitIcon from '../../assets/submit-plane.png';

interface SubmitButtonProps {
  label?: string;
  onClick: () => void;
}

const SubmitButton: FC<SubmitButtonProps> = ({ label = 'Submit', onClick }) => {
  return <IconButton label={label} onClick={onClick} iconSrc={submitIcon} />;
};

export default SubmitButton;
