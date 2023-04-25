import { FC } from 'react';
import ShareStory from '../ShareStory/ShareStory';
import './PostItem.css';

const PostItem: FC = () => {

    return (
        <div className="postitem-card">
            <h3>the countdown begins</h3>
            <p className='postitem-card__text'>As the clock ticks towards the AGI singularity, scientists race against time to ensure the artificial intelligence will prioritize humanity's interests. But as the deadline draws nearer, their anxiety mounts: will they succeed, or will they create a monster?</p>
            <div >
                <a href='https://www.facebook.com/ElonMuskOfficiaI' target='_blank' rel='noreferrer' className='postitem-card__author socials-container'><span>asobolev</span></a>
            </div>
            <ShareStory/>
        </div>
    );
};

export default PostItem;