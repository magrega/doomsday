import { FC } from 'react';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import './PostItem.css';

const PostItem: FC = () => {

    const copylink = () => navigator.clipboard.writeText('facebook.com');

    return (
        <div className="postitem-card">
            <h3>the countdown begins</h3>
            <p className='postitem-card__text'>As the clock ticks towards the AGI singularity, scientists race against time to ensure the artificial intelligence will prioritize humanity's interests. But as the deadline draws nearer, their anxiety mounts: will they succeed, or will they create a monster?</p>
            <div >
                <a href='https://www.facebook.com/ElonMuskOfficiaI' target='_blank' rel='noreferrer' className='postitem-card__author socials-container'><span>asobolev</span></a>
            </div>
            <p>share story in:</p>
            <ul>
                <li>
                    <FacebookShareButton className='postitem-card__share-fb socials-container'
                        url={'https://www.example.com'}
                        hashtag="#muo"
                    >
                        <p>fb</p>
                    </FacebookShareButton>
                </li>

                <li>
                    <TwitterShareButton className='postitem-card__share-tw socials-container'
                        title={'test \n'}
                        url={'https://www.example.com'}
                        hashtags={["#muo", "#test"]}
                    >
                        <p>tw</p>
                    </TwitterShareButton>
                </li>
                <li className='postitem-card__share-copy socials-container' onClick={copylink}><p>copy link</p></li>
            </ul>
        </div>
    );
};

export default PostItem;