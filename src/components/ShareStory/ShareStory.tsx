import { FC } from 'react';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import './ShareStory.css';

const ShareStory: FC = () => {
    const copylink = () => navigator.clipboard.writeText('facebook.com');

    return (
        <>
            <p>share story in:</p>
            <ul className='share-story__list'>
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
        </>
    );
};

export default ShareStory;