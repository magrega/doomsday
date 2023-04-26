import { FC } from 'react';
import ShareStory from '../ShareStory/ShareStory';
import './PostItem.css';

interface IPostItemProps {
    title: string;
    body: string;
    userId: number;
}

const PostItem: FC<IPostItemProps> = ({title, body, userId}) => {

    return (
        <div className="postitem-card">
            <h3>{title}</h3>
            <p className='postitem-card__text'>{body}</p>
            <div >
                <a href='https://www.facebook.com/ElonMuskOfficiaI' target='_blank' rel='noreferrer' className='postitem-card__author socials-container'><span>{userId}</span></a>
            </div>
            <ShareStory/>
        </div>
    );
};

export default PostItem;