import { FC, useState } from 'react';
import { TStory } from '../../App.types';
import GeneratedResultDiv from '../GeneratedResultParagraph/GeneratedResultDiv';
import ModalBase from '../ModalBase/ModalBase';
import ShareStory from '../ShareStory/ShareStory';
import './PostItem.css';

const truncate = (str: string, length: number) => str.length > length ? str.slice(0, length) + '...' : str;

interface IPostItemProps {
    post: TStory;
}

const PostItem: FC<IPostItemProps> = ({post}) => {

    const [user, setUser] = useState('');
    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);
    // const updateUser = useCallback(() => {
    //     getUser(post.userId).then(user => setUser(user.username));
    // }, [post.userId])

    // useEffect(() => { updateUser() }, [updateUser]);

    return (
        <div className='postitem-card'>
            <div onClick={handleOpen} className='postitem-card__text-container'>
                <h3>{post.id}</h3>
                <p className='postitem-card__text'>{truncate(post.content, 300)}</p>
            </div>
            <div>
                <a href='https://www.facebook.com/ElonMuskOfficiaI' target='_blank' rel='noreferrer' className='postitem-card__author socials-container'><span>{user ?? 'anonymus'}</span></a>
            </div>
            <ShareStory />
            <ModalBase open={open} handleClose={handleClose}>
                <GeneratedResultDiv body={post.content} />
                <ShareStory />
            </ModalBase>
        </div>
    );
};

export default PostItem;