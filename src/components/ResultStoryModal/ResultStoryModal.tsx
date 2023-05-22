import { FC, SyntheticEvent, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import starIcon from '../../assets/icons/starIcon.svg';
import { sendPost } from '../../services/fetchPosts';
import GeneratedResultDiv from '../GeneratedResultParagraph/GeneratedResultDiv';
import ModalBase from '../ModalBase/ModalBase';
import ShareStory from '../ShareStory/ShareStory';
import './ResultStoryModal.css';

interface IResultStoryModal {
  closeModal: () => void;
}

const ResultStoryModal: FC<IResultStoryModal> = ({ closeModal }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userInputValue, setUserInputValue] = useState('');

  const postStory = (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    sendPost(userInputValue).then(() => {
      setUserInputValue(userInputValue);
      setOpen(true);
      setIsLoading(false);
    }).catch(e => {
      console.log(e.message);
      setUserInputValue(e.message);
      setIsLoading(false);
  });
  }

  const buttonText = isLoading ? <BeatLoader color='#1E212C'/> : <>craft your story<img src={starIcon} alt="beautiful stars" /></>

  return (
    <>
      <form onSubmit={postStory}>
        <input
          required
          minLength={5}
          maxLength={300}
          type="text"
          placeholder='enter a prompt to inspire your unique tale'
          value={userInputValue}
          onChange={e => setUserInputValue(e.target.value)} />
        <button type='submit' className='navbar__btn result-story-btn'>{buttonText}</button>
      </form>
      <ModalBase open={open} handleClose={closeModal}>
        <GeneratedResultDiv body={userInputValue} />
        <ShareStory text={userInputValue}/>
      </ModalBase>
    </>
  );
}

export default ResultStoryModal;
