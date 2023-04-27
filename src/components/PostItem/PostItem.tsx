import { FC, useState, useEffect, useCallback } from 'react';
import { Box, Modal } from '@mui/material';
import { getUser } from '../../services/getPosts';
import ShareStory from '../ShareStory/ShareStory';
import './PostItem.css';

interface IPostItemProps {
    title: string;
    body: string;
    userId: number;
}

const PostItem: FC<IPostItemProps> = ({ title, body, userId }) => {

    const [user, setUser] = useState('');
    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);


    const updateUser = useCallback(() => {
        getUser(userId).then(user => setUser(user.username));
    }, [userId])

    useEffect(() => {
        updateUser()
    }, [updateUser])

    const truncate = (str: string, length: number) => str.length > length ? str.slice(0, length) + '...' : str;

    return (
        <div className="postitem-card">
            <h3>{title}</h3>
            <p onClick={handleOpen} className='postitem-card__text'>{truncate(body, 300)}</p>
            <div >
                <a href='https://www.facebook.com/ElonMuskOfficiaI' target='_blank' rel='noreferrer' className='postitem-card__author socials-container'><span>{user}</span></a>
            </div>
            <ShareStory />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box className="modal-window">
                    <div className="modal-window__top">
                        <h3>share your story in our feed</h3>
                        <svg onClick={handleClose} width="20" height="25" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="1.35681" width="26.3654" height="1.31827" transform="rotate(45 1.35681 0)" fill="#C8EDC1" />
                            <rect x="0.424683" y="18.6431" width="26.3654" height="1.31827" transform="rotate(-45 0.424683 18.6431)" fill="#C8EDC1" />
                        </svg>
                    </div>
                    <p className='generate-result'>{body}</p>
                    <ShareStory />
                </Box>
            </Modal>
        </div>
    );
};

export default PostItem;