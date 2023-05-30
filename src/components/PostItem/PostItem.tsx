import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { TStory } from '../../App.types';
import ShareStory from '../ShareStory/ShareStory';
import styles from './PostItem.module.css';

const truncate = (str: string, length: number) => str.length > length ? str.slice(0, length) + '...' : str;

interface IPostItemProps {
    post: TStory;
}

const PostItem: FC<IPostItemProps> = ({ post }) => {
    const navigate = useNavigate();
    const openCard = () => navigate(`story/${post.id}`);

    return (
        <div onClick={openCard} className={styles['postitem-card']}>
            <div className={styles['postitem-card__text-container']}>
                <h3 className={styles['postitem-card__h3']}>{post.id}</h3>
                <p className={styles['postitem-card__text']}>{truncate(post.content, 300)}</p>
            </div>
            <div>
                <a onClick={(e) => e.stopPropagation()} href='https://www.facebook.com/ElonMuskOfficiaI' target='_blank' rel='noreferrer' className={`${styles['postitem-card__author']} ${styles['socials-container']}`}><span>anonymous</span></a>
            </div>
            <ShareStory text={post.content} id={String(post.id)} />
        </div>
    );
};

export default PostItem;