import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPost } from '../../services/fetchPosts';
import ModalBase from '../ModalBase/ModalBase';
import ShareStory from '../ShareStory/ShareStory';
import Spinner from '../Spinner/Spinner';
import './ResultStoryModal.css';

interface IResultStoryModal {
  isResultOpen: boolean;
}

const ResultStoryModal: FC<IResultStoryModal> = ({ isResultOpen }) => {
  const [openResultModal, setOpenResultModal] = useState(false);
  const [isResultLoading, setIsResultLoading] = useState(true);
  const [post, setPost] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();
  const handleClose = () => {
    setOpenResultModal(false);
    navigate('/');
  }

  useEffect(() => {
    if (id) getPost(id).then(post => {
      setPost(post.content);
      setIsResultLoading(false);
    }).catch(e => {
      console.log(e.message);
      setPost(e.message);
      setIsResultLoading(false);
    });
  }, [id]);

  useEffect(() => { setOpenResultModal(isResultOpen) }, [isResultOpen]);

  return (
    <>
      <ModalBase open={openResultModal} handleClose={handleClose}>
        <div className='generate-result'>{isResultLoading ? <Spinner /> : post}</div>
        <ShareStory text={post} id={id} />
      </ModalBase>
    </>
  );
}

export default ResultStoryModal;
