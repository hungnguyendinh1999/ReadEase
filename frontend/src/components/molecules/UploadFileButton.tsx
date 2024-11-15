import React, { FC } from 'react';
import './UploadFileButton.css';
import defaultUploadIcon from '../../assets/upload-file.png';

import IconButton from '../atom/IconButton';

interface UploadFileButtonProps {
  label?: string;
  onClick: () => void;
}

const UploadFileButton: FC<UploadFileButtonProps> = ({ label = 'Upload File', onClick }) => {
  return <IconButton label={label} onClick={onClick} iconSrc={defaultUploadIcon} />;
};

export default UploadFileButton;

