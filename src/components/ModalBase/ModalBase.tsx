import { Box, Modal } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import CrossButton from '../../assets/icons/cross.svg';
import './ModalBase.css'

interface IModalBase {
    open: boolean;
    handleClose: () => void;
    title?: string;
}

const ModalBase: FC<PropsWithChildren<IModalBase>> = ({ open, handleClose, title = "share your story in our feed", children }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
        >
            <Box className="modal-window">
                <div className="modal-window__top">
                    <h3>{title}</h3>
                    <img onClick={handleClose} src={CrossButton} alt="Close Button" />
                </div>
                {children}
            </Box>
        </Modal>
    );
};

export default ModalBase;