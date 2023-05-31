import { FC, SyntheticEvent } from 'react';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import styles from './ShareStory.module.css';

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
            <ul className={styles['share-story__list']} onClick={stopPropagation}>
                <li>
                    <FacebookShareButton
                        className={`${styles['share-story__share-fb']} ${styles['socials-container']}`}
                        url={linkToClickedPost}
                        hashtag='#test'
                    >
                        <p>fb</p>
                    </FacebookShareButton>
                </li>
                <li>
                    <TwitterShareButton
                        className={`${styles['share-story__share-tw']} ${styles['socials-container']}`}
                        title={text}
                        url={linkToClickedPost}
                        hashtags={['test']}
                    >
                        <p>tw</p>
                    </TwitterShareButton>
                </li>
                <li
                    className={`${styles['share-story__share-copy']} ${styles['socials-container']}`}
                     onClick={copylink}>
                    <p>copy link</p>
                </li>
            </ul>
        </>
    );
};

export default ShareStory;