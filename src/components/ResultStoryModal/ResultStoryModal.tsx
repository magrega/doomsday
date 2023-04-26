import { Box, Modal } from '@mui/material';
import { FC, SyntheticEvent, useState } from 'react';
import ShareStory from '../ShareStory/ShareStory';
import { getRandomPost } from '../../services/getPosts';
import { TPost } from '../../services/getPosts';
import Spinner from '../Spinner/Spinner';

//uses styles from AddStoryModal.css

const ResultStoryModal: FC = () => {
  const [open, setOpen] = useState(false);
  const [post, setPost] = useState<TPost | undefined>(undefined);

  const handleOpen = (e: SyntheticEvent ) => {
    e.preventDefault();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const generatePost = (e: SyntheticEvent ) => {
    e.preventDefault();
    getRandomPost().then(post => setPost(post));
    setOpen(true);
  }

  return (
    <>
      <a onClick={generatePost} className='navbar__a' href='/'>craft your story<svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.84897 1.5L7.34726 3.07574L9.19793 3.5L7.34726 3.92426L6.84897 5.5L6.35067 3.92426L4.5 3.5L6.35067 3.07574L6.84897 1.5Z" fill="#1E212C" />
            <path d="M3.22648 5.5L3.80485 7.46967L5.95296 8L3.80485 8.53033L3.22648 10.5L2.6481 8.53033L0.5 8L2.6481 7.46967L3.22648 5.5Z" fill="#1E212C" />
            <path d="M11 4L12.3789 9.12114L17.5 10.5L12.3789 11.8789L11 17L9.62114 11.8789L4.5 10.5L9.62114 9.12114L11 4Z" fill="#1E212C" />
          </svg>
          </a>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box className="modal-window">
        <div className="modal-window__top">
              <h3>share your story for publishing in our feed</h3>
            <svg onClick={handleClose} width="20" height="25" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1.35681" width="26.3654" height="1.31827" transform="rotate(45 1.35681 0)" fill="#C8EDC1" />
              <rect x="0.424683" y="18.6431" width="26.3654" height="1.31827" transform="rotate(-45 0.424683 18.6431)" fill="#C8EDC1" />
            </svg>
          </div>
          <p className='generate-result'>{post ? post.body : <Spinner/>}</p>
          <ShareStory/>
        </Box>
      </Modal>
    </>
  );
}

export default ResultStoryModal;