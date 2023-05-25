import { Box, Modal } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import CrossButton from '../../assets/icons/cross.svg';
import './ModalBase.css';
import { Link } from 'react-router-dom';

interface IModalBase {
    open: boolean;
    handleClose?: () => void;
    title?: string;
}

const ModalBase: FC<PropsWithChildren<IModalBase>> = ({ open, handleClose, title, children }) => {

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='child-modal-title'
            aria-describedby='child-modal-description'
        >
            <Box className='modal-window'>
                <div className='modal-window__top'>
                    <h3>{title ?? 'share your story in our feed'}</h3>
                    <Link to={'/'}><img onClick={handleClose} src={CrossButton} alt='Close Button' /></Link>
                </div>
                {children}
            </Box>
        </Modal>
    );
};

export default ModalBase;