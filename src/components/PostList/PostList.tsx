import { FC, useEffect, useState } from 'react';
import { FreeMode, Mousewheel, Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { TStory } from '../../App.types';
import { getPosts } from '../../services/fetchPosts';
import AddStoryModal from '../AddStoryModal/AddStoryModal';
import ErrorSign from '../ErrorSign/ErrorSign';
import PostItem from '../PostItem/PostItem';
import Spinner from '../Spinner/Spinner';
import './PostList.css';

const PostList: FC = () => {
    const [limit, setLimit] = useState(false);
    const [postsData, setPostsData] = useState<TStory[]>();
    const [loading, setLoading] = useState(true);
    const [loadingOldPosts, setLoadingOldPosts] = useState(false);
    const [loadingNewPosts, setLoadingNewPosts] = useState(false);
    const [swiperInstance, setSwiperInstance] = useState<SwiperType>();
    const [error, setError] = useState(false);

    const checkNewPosts = () => {
        setLoadingNewPosts(true);
        getPosts(`/story/?offset=0&limit=15`)
            .then(newPosts => {
                newPosts && setPostsData([...newPosts.stories]);
                setLoadingNewPosts(false);
                setLoading(false);
            })
            .catch(e => {
                console.log(e.message);
                setError(true);
                setLoading(false);
                setLoadingNewPosts(false);
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
            setLoadingOldPosts(false);
            setLoading(false);
        })
        .catch(e => {
            console.log(e.message);
            setError(true);
            setLoading(false);
            setLoadingOldPosts(false);
        });

    const onTouchStart = (swiper: SwiperType) => {
        if (swiper.progress === 1 && !limit) {
            setLoadingOldPosts(true);
            addOlderPosts();
        }
    }

    const onTouchEnd = (swiper: SwiperType) => {
        if (swiper.progress < -0.02) checkNewPosts();
    }

    const enableScroll = () => window.onscroll = () => { };
    const disableScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        window.onscroll = () => window.scroll({ top: scrollTop });
    }

    useEffect(() => {
        checkNewPosts();
    }, []);

    return (
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
            {loading ? <Spinner /> :
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
                        {loadingNewPosts && <SwiperSlide className='post-item-spinner' key='spinner'><Spinner /></SwiperSlide>}
                        {postsData && postsData?.map((post: TStory) => {
                            return <SwiperSlide key={post.id}>
                                <PostItem post={post} />
                            </SwiperSlide>
                        })}
                        {error && <ErrorSign />}
                        {loadingOldPosts && <SwiperSlide className='post-item-spinner' key='spinner'><Spinner /></SwiperSlide>}
                    </Swiper>
                </div>}
        </div>
    );
};

export default PostList;