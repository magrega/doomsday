import { FC, useEffect, useState } from 'react';
import { FreeMode, Mousewheel, Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { TStory } from '../../App.types';
import { getPosts } from '../../services/fetchPosts';
import AddStoryModal from '../AddStoryModal/AddStoryModal';
import PostItem from '../PostItem/PostItem';
import ErrorSnackbar from '../Snackbar/Snackbar';
import Spinner from '../Spinner/Spinner';
import styles from './PostList.module.css';
import 'swiper/css';

const PostList: FC = () => {
    const [swiperInstance, setSwiperInstance] = useState<SwiperType>();
    const [postsData, setPostsData] = useState<TStory[]>();
    const [limit, setLimit] = useState(false);
    const [error, setError] = useState({ state: false, errorText: '' });
    const [loading, setLoading] = useState({ postFeed: true, newPosts: false, oldPosts: false });

    const checkNewPosts = () => {
        if (!error.state && !loading.postFeed) setLoading({ postFeed: false, newPosts: true, oldPosts: false });
        getPosts(`/?offset=0&limit=10`)
            .then(newPosts => {
                newPosts && setPostsData([...newPosts.stories]);
                setLoading({ postFeed: false, newPosts: false, oldPosts: false });
                setError({ state: false, errorText: '' });
            })
            .catch(e => {
                setError({ state: true, errorText: e.message });
                setLoading({ postFeed: false, newPosts: false, oldPosts: false });
            });
    }

    const scrollBackAndRefresh = () => {
        swiperInstance?.setProgress(0, 1000);
        checkNewPosts();
    }

    const addOlderPosts = () => getPosts()
        .then(newPosts => {
            newPosts.next_url === null ? setLimit(true) : setLimit(false);
            setPostsData(prevState => [...(prevState ?? []), ...newPosts.stories]);
            setLoading({ postFeed: false, newPosts: false, oldPosts: false });
        })
        .catch(e => {
            setError({ state: true, errorText: e.message });
            setLoading({ postFeed: false, newPosts: false, oldPosts: false });
        });

    const onTouchEnd = (swiper: SwiperType) => {
        if (swiper.progress < 0) checkNewPosts();
        if (-swiper.translate > swiper.snapGrid[swiper.snapGrid.length - 1] + 100 && !limit) {
            setLoading({ postFeed: false, newPosts: false, oldPosts: true });
            addOlderPosts();
        }
    }

    const enableScroll = () => window.onscroll = null;
    const disableScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        window.onscroll = () => window.scroll({ top: scrollTop });
    }
    // eslint-disable-next-line
    useEffect(() => { checkNewPosts(); }, []);

    return (
        <>
            <div>
                <div className={styles['post-list__menu']}>
                    <div className={styles['post-list__menu-left']}>
                        <span onClick={scrollBackAndRefresh}>user stories</span>
                        <span className={styles.disabled}>
                            last change
                            <span className={styles.sticker}>soon</span>
                        </span>
                    </div>
                    <AddStoryModal checkNewPosts={checkNewPosts} />
                </div>
                {loading.postFeed ? <Spinner /> :
                    <div className={styles['post-list__postitem-view']}
                        onMouseEnter={disableScroll}
                        onMouseLeave={enableScroll}
                    >
                        <Swiper className={styles.swiper}
                            onSwiper={setSwiperInstance}
                            onTouchEnd={onTouchEnd}
                            modules={[Mousewheel, FreeMode]}
                            spaceBetween={10}
                            slidesPerView='auto'
                            mousewheel
                            freeMode={{
                                enabled: true,
                                sticky: true,
                            }}
                        >
                            {loading.newPosts && <SwiperSlide className={styles['post-item-spinner']} key='spinner'><Spinner /></SwiperSlide>}
                            {postsData && postsData.map((post: TStory) => {
                                return <SwiperSlide className={styles['swiper-slide']} key={post.id}>
                                    <PostItem post={post} />
                                </SwiperSlide>
                            })}
                            {loading.oldPosts && <SwiperSlide className={styles['post-item-spinner']} key='spinner'><Spinner /></SwiperSlide>}
                        </Swiper>
                    </div>}
            </div>
            {error.state && <ErrorSnackbar error={error} setError={setError} />}
        </>
    );
};

export default PostList;