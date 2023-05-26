import { FC, SyntheticEvent } from 'react';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import './ShareStory.css';

interface IShareStory {
    text: string;
    id?: string;
}

const ShareStory: FC<IShareStory> = ({ text, id }) => {
    const linkToClickedPost = `${window.location.host}/story/${id}`;
    const stopPropagation = (e: SyntheticEvent) => e.stopPropagation();
    const copylink = () => id && navigator.clipboard.writeText(linkToClickedPost);

    return (
        <>
            <p>share story in:</p>
            <ul className='share-story__list' onClick={stopPropagation}>
                <li>
                    <FacebookShareButton
                        className='postitem-card__share-fb socials-container'
                        url={linkToClickedPost}
                        hashtag='#muo'
                    >
                        <p>fb</p>
                    </FacebookShareButton>
                </li>
                <li>
                    <TwitterShareButton
                        className='postitem-card__share-tw socials-container'
                        title={text}
                        url={linkToClickedPost}
                        hashtags={['#muo', '#test']}
                    >
                        <p>tw</p>
                    </TwitterShareButton>
                </li>
                <li
                    className='postitem-card__share-copy socials-container'
                    onClick={copylink}>
                    <p>copy link</p>
                </li>
            </ul>
        </>
    );
};

export default ShareStory;