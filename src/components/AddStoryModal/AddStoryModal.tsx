import { FC, SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import starIcon from '../../assets/icons/starIcon.svg';
import { sendPost } from '../../services/fetchPosts';
import MainButton from '../MainButton/MainButton';
import ModalBase from '../ModalBase/ModalBase';
import styles from './AddStoryModal.module.css';


interface IAddStoryModal {
  checkNewPosts: () => void;
}

const AddStoryModal: FC<IAddStoryModal> = ({ checkNewPosts }) => {
  const [openAddStoryModal, setOpenAddStoryModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userInputValue, setUserInputValue] = useState('');

  const navigate = useNavigate();
  const handleOpen = () => setOpenAddStoryModal(true);
  const handleClose = () => setOpenAddStoryModal(false);

  const postStory = (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    sendPost(userInputValue)
      .then((post) => {
        setUserInputValue(userInputValue);
        setIsLoading(false);
        navigate(`story/${post.id}`)
        setOpenAddStoryModal(false);
        setUserInputValue('');
      })
      .then(() => checkNewPosts())
      .catch(e => {
        console.log(e.message);
        setUserInputValue(e.message);
        setIsLoading(false);
      });
  }

  const buttonText = isLoading ? <BeatLoader color='#1E212C' /> : <>craft your story<img src={starIcon} alt="beautiful stars" /></>

  return (
    <>
      <span onClick={handleOpen}>{window.innerWidth < 500 ? "+ add" : "+ generate your story"}</span>
      <ModalBase open={openAddStoryModal} handleClose={handleClose} title='craft your story'>
        <form onSubmit={postStory}>
          <input autoFocus={true} className={styles['modal-window__input']}
            required
            minLength={5}
            maxLength={300}
            type="text"
            placeholder='enter text to inspire your tale'
            value={userInputValue}
            onChange={e => setUserInputValue(e.target.value)} />
          <MainButton text={buttonText}/>
        </form>
        <p className={styles['modal-window__p']}>Unleash the power of your imagination and shape the future with your stories. Use our AI-powered generator to create positive, negative, or balanced narratives. Remember, your voice can influence the world and make a difference. Let's start crafting your tale today!</p>
      </ModalBase>
    </>
  );
}

export default AddStoryModal;