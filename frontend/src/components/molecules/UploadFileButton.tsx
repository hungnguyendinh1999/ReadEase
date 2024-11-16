import React, {FC} from 'react';
import './UploadFileButton.css';
import IconButton from '../atom/IconButton';
import defaultUploadIcon from '../../assets/upload-file.png';
import whiteUploadIcon from '../../assets/upload-file-white.png';

interface UploadFileButtonProps {
    label?: string;
    onClick: () => void;
    inverseColor?: boolean;
}

const UploadFileButton: FC<UploadFileButtonProps> = ({label = 'Upload File', onClick, inverseColor = false}) => {
    const icon = inverseColor ? whiteUploadIcon : defaultUploadIcon;

    return <IconButton label={label} onClick={onClick} iconSrc={icon} className="upload-file-button" inverseColor={inverseColor}/>;
};

export default UploadFileButton;