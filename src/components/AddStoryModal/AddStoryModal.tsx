import { FC, useState, useRef } from 'react';
import ModalBase from '../ModalBase/ModalBase';
import ResultStoryModal from '../ResultStoryModal/ResultStoryModal';
import './AddStoryModal.css';

interface IAddStoryModal {
  checkNewPosts: () => void;
}

const AddStoryModal: FC<IAddStoryModal> = ({ checkNewPosts }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    checkNewPosts();
    setOpen(false);
  }
  const inputRef = useRef<HTMLInputElement>(null);

  const getUserInputValue = () => {
    if (inputRef.current === null) {
      return '';
    } else {
      return inputRef.current.value;
    }
  }

  return (
    <>
      <span onClick={handleOpen}>{window.innerWidth < 500 ? "+ add" : "+ generate your story"}</span>
      <ModalBase open={open} handleClose={handleClose} title='craft your story'>
        <form><input ref={inputRef} required type="text" placeholder='enter a prompt to inspire your unique tale' />
          <ResultStoryModal userInputValue={getUserInputValue} closeModal={handleClose} />
        </form>
        <span>Unleash the power of your imagination and shape the future with your stories. Use our AI-powered generator to create positive, negative, or balanced narratives. Remember, your voice can influence the world and make a difference. Let's start crafting your tale today!</span>
      </ModalBase>
    </>
  );
}

export default AddStoryModal;