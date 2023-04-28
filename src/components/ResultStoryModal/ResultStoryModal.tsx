import { FC, SyntheticEvent, useState } from 'react';
import { TPost, getRandomPost } from '../../services/getPosts';
import ModalBase from '../ModalBase/ModalBase';
import ShareStory from '../ShareStory/ShareStory';
import Spinner from '../Spinner/Spinner';
import starIcon from '../../assets/icons/starIcon.svg';
import GeneratedResultParagraph from '../GeneratedResultParagraph/GeneratedResultParagraph';
import './ResultStoryModal.css';

const ResultStoryModal: FC = () => {
  const [open, setOpen] = useState(false);
  const [post, setPost] = useState<TPost | undefined>(undefined);

  const handleClose = () => setOpen(false);
  const generatePost = (e: SyntheticEvent) => {
    e.preventDefault();
    getRandomPost().then(post => setPost(post));
    setOpen(true);
  }

  return (
    <>
      <a onClick={generatePost} className='navbar__a' href='/'>craft your story <img src={starIcon} alt="beautiful stars" /></a>
      <ModalBase open={open} handleClose={handleClose}>
        <GeneratedResultParagraph body={post ? post.body : <Spinner />} />
        <ShareStory />
      </ModalBase>
    </>
  );
}

export default ResultStoryModal;