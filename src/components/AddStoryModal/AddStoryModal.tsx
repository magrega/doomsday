import { Box, Modal } from '@mui/material';
import { useState, FC } from 'react';
import './AddStoryModal.css';

const AddStoryModal: FC = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  return (
    <>
      <span onClick={handleOpen}>{window.innerWidth < 500 ? "+ add" : "+ generate your story"}</span>
      <Modal
        className='modal'
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-window">
          <div className="modal-window__top">
            <h3>generate your story</h3>
            <svg onClick={handleClose} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1.35681" width="26.3654" height="1.31827" transform="rotate(45 1.35681 0)" fill="#C8EDC1" />
              <rect x="0.424683" y="18.6431" width="26.3654" height="1.31827" transform="rotate(-45 0.424683 18.6431)" fill="#C8EDC1" />
            </svg>
          </div>
          <input type="text" placeholder='write prompt to generate your story ✨' />
          <a className='navbar__a' href='/'>generate</a>
        </Box>
      </Modal>
    </>
  );
}

export default AddStoryModal;