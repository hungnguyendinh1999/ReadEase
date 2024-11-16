import React, { FC } from 'react';
import './UploadFileButton.css';
import IconButton from '../atom/IconButton';
import defaultUploadIcon from '../../assets/upload-file.png';

interface UploadFileButtonProps {
  label?: string;
  onClick: () => void;
}

const UploadFileButton: FC<UploadFileButtonProps> = ({ label = 'Upload File', onClick }) => {
  return <IconButton label={label} onClick={onClick} iconSrc={defaultUploadIcon} className="upload-file-button"/>;
};

export default UploadFileButton;

