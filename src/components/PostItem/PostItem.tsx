import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { TStory } from '../../App.types';
import ShareStory from '../ShareStory/ShareStory';
import './PostItem.css';

const truncate = (str: string, length: number) => str.length > length ? str.slice(0, length) + '...' : str;

interface IPostItemProps {
    post: TStory;
}

const PostItem: FC<IPostItemProps> = ({ post }) => {
    const navigate = useNavigate();
    const openCard = () => navigate(`story/${post.id}`);

    return (
        <div onClick={openCard} className='postitem-card'>
            <div className='postitem-card__text-container'>
                <h3>{post.id}</h3>
                <p className='postitem-card__text'>{truncate(post.content, 300)}</p>
            </div>
            <div>
                <a onClick={(e) => e.stopPropagation()} href='https://www.facebook.com/ElonMuskOfficiaI' target='_blank' rel='noreferrer' className='postitem-card__author socials-container'><span>anonymous</span></a>
            </div>
            <ShareStory text={post.content} id={String(post.id)} />
        </div>
    );
};

export default PostItem;