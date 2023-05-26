import { FC, useEffect, useState } from 'react';
import { FreeMode, Mousewheel, Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { TStory } from '../../App.types';
import ErrorSnackbar from '../Snackbar/Snackbar';
import { getPosts } from '../../services/fetchPosts';
import AddStoryModal from '../AddStoryModal/AddStoryModal';
import PostItem from '../PostItem/PostItem';
import Spinner from '../Spinner/Spinner';
import './PostList.css';
import 'swiper/css';

const PostList: FC = () => {
    const [swiperInstance, setSwiperInstance] = useState<SwiperType>();
    const [postsData, setPostsData] = useState<TStory[]>();
    const [limit, setLimit] = useState(false);
    const [error, setError] = useState({ state: false, errorText: '' });
    const [loading, setLoading] = useState({ postFeed: true, newPosts: false, oldPosts: false });

    const checkNewPosts = () => {
        if (!error.state && !loading.postFeed) setLoading({ postFeed: false, newPosts: true, oldPosts: false });
        getPosts(`/story/?offset=0&limit=15`)
            .then(newPosts => {
                newPosts && setPostsData([...newPosts.stories]);
                setLoading({ postFeed: false, newPosts: false, oldPosts: false });
                setError({ state: false, errorText: '' });
            })
            .catch(e => {
                console.log(e.message);
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
            newPosts && setPostsData(prevState => [...(prevState ?? []), ...newPosts.stories]);
            newPosts?.next_url === null ? setLimit(true) : setLimit(false);
            setLoading({ postFeed: false, newPosts: false, oldPosts: false });
        })
        .catch(e => {
            console.log(e.message);
            setError({ state: true, errorText: e.message });
            setLoading({ postFeed: false, newPosts: false, oldPosts: false });
        });

    const onTouchStart = (swiper: SwiperType) => {
        if (swiper.progress === 1 && !limit) {
            setLoading({ postFeed: false, newPosts: false, oldPosts: true });
            addOlderPosts();
        }
    }

    const onTouchEnd = (swiper: SwiperType) => {
        if (swiper.progress < -0.02) checkNewPosts();
    }

    const enableScroll = () => window.onscroll = null;
    const disableScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        window.onscroll = () => window.scroll({ top: scrollTop });
    }

    useEffect(() => { checkNewPosts(); }, []);

    return (
        <>
            <div className='post-list'>
                <div className='post-list__menu'>
                    <div className='post-list__menu-left'>
                        <span onClick={scrollBackAndRefresh}>user stories</span>
                        <span className='disabled'>
                            last change
                            <span className='sticker'>soon</span>
                        </span>
                    </div>
                    <AddStoryModal checkNewPosts={checkNewPosts} />
                </div>
                {loading.postFeed ? <Spinner /> :
                    <div className='post-list__postitem-view'
                        onMouseEnter={disableScroll}
                        onMouseLeave={enableScroll}
                    >
                        <Swiper
                            onSwiper={setSwiperInstance}
                            onTouchStart={onTouchStart}
                            onTouchEnd={onTouchEnd}
                            modules={[Mousewheel, FreeMode]}
                            mousewheel
                            spaceBetween={10}
                            slidesPerView='auto'
                            passiveListeners={false}
                            freeMode={{
                                enabled: true,
                                sticky: false,
                                momentumRatio: 0.4,
                                momentumBounce: true
                            }}
                        >
                            {loading.newPosts && <SwiperSlide className='post-item-spinner' key='spinner'><Spinner /></SwiperSlide>}
                            {postsData && postsData.map((post: TStory) => {
                                return <SwiperSlide key={post.id}>
                                    <PostItem post={post} />
                                </SwiperSlide>
                            })}
                            {loading.oldPosts && <SwiperSlide className='post-item-spinner' key='spinner'><Spinner /></SwiperSlide>}
                        </Swiper>
                    </div>}
            </div>
            {error.state && <ErrorSnackbar error={error} setError={setError} />}
        </>
    );
};

export default PostList;