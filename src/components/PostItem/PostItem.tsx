import { FC, useCallback, useEffect, useState } from 'react';
import { getUser } from '../../services/getPosts';
import GeneratedResultParagraph from '../GeneratedResultParagraph/GeneratedResultParagraph';
import ModalBase from '../ModalBase/ModalBase';
import ShareStory from '../ShareStory/ShareStory';
import './PostItem.css';

interface IPostItemProps {
    id: number;
    title: string;
    body: string;
    userId: number;
}

const PostItem: FC<IPostItemProps> = ({ title, body, userId, id }) => {

    const [user, setUser] = useState('');
    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);
    const truncate = (str: string, length: number) => str.length > length ? str.slice(0, length) + '...' : str;
    const updateUser = useCallback(() => {
        getUser(userId).then(user => setUser(user.username));
    }, [userId])

    useEffect(() => { updateUser() }, [updateUser]);

    return (
        <div className="postitem-card">
            <div onClick={handleOpen} className='postitem-card__text-container'>
                <h3>{title}</h3>
                <p className='postitem-card__text'>{truncate(body, 300)}</p>
            </div>
            <div>
                <a href='https://www.facebook.com/ElonMuskOfficiaI' target='_blank' rel='noreferrer' className='postitem-card__author socials-container'><span>{user ?? "anonymus"}</span></a>
            </div>
            <ShareStory />
            <ModalBase open={open} handleClose={handleClose}>
                <GeneratedResultParagraph body={body} />
                <ShareStory />
            </ModalBase>
        </div>
    );
};

export default PostItem;