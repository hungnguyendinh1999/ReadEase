import React, {FC} from 'react';
import './UploadFileButton.css';
import TextIconButton from '../atom/TextIconButton';
import UploadIcon from '../../assets/upload-file-white.png';

interface UploadFileButtonProps {
    label?: string;
    onClick: () => void;
}

const UploadFileButton: FC<UploadFileButtonProps> = ({label = 'Upload File', onClick}) => {
    return <TextIconButton label={label} onClick={onClick} iconSrc={UploadIcon} className="upload-file-button" inverseColor={true}/>;
};

export default UploadFileButton;