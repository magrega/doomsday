import { FC, useState } from 'react';
import ModalBase from '../ModalBase/ModalBase';
import ResultStoryModal from '../ResultStoryModal/ResultStoryModal';

import './AddStoryModal.css';

const AddStoryModal: FC = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <span onClick={handleOpen}>{window.innerWidth < 500 ? "+ add" : "+ generate your story"}</span>
      <ModalBase open={open} handleClose={handleClose} title='craft your story'>
        <input type="text" placeholder='enter a prompt to inspire your unique tale' />
        <ResultStoryModal />
        <span>Unleash the power of your imagination and shape the future with your stories. Use our AI-powered generator to create positive, negative, or balanced narratives. Remember, your voice can influence the world and make a difference. Let's start crafting your tale today!</span>
      </ModalBase>
    </>
  );
}

export default AddStoryModal;