import { FC, useEffect, useState } from 'react';
import { FreeMode, Mousewheel, Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { TStory } from '../../App.types';
import { getPosts } from '../../services/getPosts';
import AddStoryModal from '../AddStoryModal/AddStoryModal';
import ErrorSign from '../ErrorSign/ErrorSign';
import PostItem from '../PostItem/PostItem';
import Spinner from '../Spinner/Spinner';
import './PostList.css';

const PostList: FC = () => {
    const [limit, setLimit] = useState(false);
    const [postsData, setPostsData] = useState<TStory[] | undefined>();
    const [loadingOldPosts, setLoadingOldPosts] = useState(false);
    const [loadingNewPosts, setLoadingNewPosts] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const checkNewPosts = () => {
        setLoadingNewPosts(true);
        getPosts(`/story/?offset=0&limit=15`)
            .then(newPosts => {
                newPosts && setPostsData([...newPosts.stories]);
                setLoadingNewPosts(false);
                setLoading(false);
                console.log("new posts");
            })
            .catch(e => {
                setError(true);
                console.log(e.message);
                setLoadingNewPosts(false);
                setLoading(false);
            });
    }

    const addOlderPosts = () => getPosts()
        .then(newPosts => {
            newPosts && setPostsData(prevState => [...(prevState ?? []), ...newPosts.stories]);
            newPosts?.next_url === null ? setLimit(true) : setLimit(false);
            setLoadingOldPosts(false);
            setLoading(false);
            console.log("old posts");
        })
        .catch(e => {
            setError(true);
            console.log(e.message);
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
        console.log(swiper.progress);
        
    }

    useEffect(() => {
        addOlderPosts()
    }, []);

    if (loading) return <Spinner />;

    return (
        <div className='post-list'>
            <div className='post-list__menu'>
                <div className='post-list__menu-left'>
                    <span onClick={checkNewPosts}>user stories</span>
                    <span className='disabled'>
                        last change
                        <span className='sticker'>soon</span>
                    </span>
                </div>
                <AddStoryModal />
            </div>
            <div className='post-list__postitem-view'>
                <Swiper
                    modules={[Mousewheel, FreeMode]}
                    mousewheel
                    spaceBetween={10}
                    slidesPerView='auto'
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
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
            </div>
        </div>
    );
};

export default PostList;