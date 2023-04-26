import { Box, Modal } from '@mui/material';
import { FC, useState } from 'react';
import ResultStoryModal from '../ResultStoryModal/ResultStoryModal';

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
              <h3>create your future story</h3>
            <svg onClick={handleClose} width="20" height="25" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1.35681" width="26.3654" height="1.31827" transform="rotate(45 1.35681 0)" fill="#C8EDC1" />
              <rect x="0.424683" y="18.6431" width="26.3654" height="1.31827" transform="rotate(-45 0.424683 18.6431)" fill="#C8EDC1" />
            </svg>
          </div>
          <input type="text" placeholder='enter a prompt to inspire your unique tale' />
          <ResultStoryModal/>
          <span>Unleash the power of your imagination and shape the future with your stories. Use our AI-powered generator to create positive, negative, or balanced narratives. Remember, your voice can influence the world and make a difference. Let's start crafting your tale today!</span>
        </Box>
      </Modal>
    </>
  );
}

export default AddStoryModal;