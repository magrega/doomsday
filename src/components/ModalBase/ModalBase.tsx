import { Box, Modal } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import CrossButton from '../../assets/icons/cross.svg';
import styles from './ModalBase.module.css';

interface IModalBase {
    open: boolean;
    handleClose?: () => void;
    title?: string;
}
//booby

const ModalBase: FC<PropsWithChildren<IModalBase>> = ({ open, handleClose, title, children }) => {

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='child-modal-title'
            aria-describedby='child-modal-description'
        >
            <Box className={`${styles['modal-window']} ${styles['MuiBox-root']}`}>
                <div className={styles['modal-window__top']}>
                    <h3 className={styles['modal-window-h3']} >{title ?? 'share your story in our feed'}</h3>
                    <Link className={styles['modal-window__link']} to={'/'}><img onClick={handleClose} src={CrossButton} alt='Close Button' /></Link>
                </div>
                {children}
            </Box>
        </Modal>
    );
};

export default ModalBase;