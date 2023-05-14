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
    const [loadingMorePosts, setLoadingMorePosts] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const checkNewPosts = () => getPosts(`/story/?offset=0&limit=3`)
    .then(newPosts => {
        newPosts && setPostsData([...newPosts.stories]);
        setLoadingMorePosts(false);
        setLoading(false);
        console.log("new posts");
    })
    .catch(e => {
        setError(true);
        console.log(e.message);
        setLoading(false);
        setLoadingMorePosts(false);
    });

    const addOlderPosts = () => getPosts()
        .then(newPosts => {
            newPosts && setPostsData(prevState => [...(prevState ?? []), ...newPosts.stories]);
            newPosts?.next_url === null ? setLimit(true) : setLimit(false);
            setLoadingMorePosts(false);
            setLoading(false);
            console.log("old posts");
        })
        .catch(e => {
            setError(true);
            console.log(e.message);
            setLoading(false);
            setLoadingMorePosts(false);
        });

    const showMore = () => {
        setLoadingMorePosts(true);
        addOlderPosts();
    }

    const onTouchStart = (swiper: SwiperType) => {
        if (swiper.progress === 1 && !limit) showMore();
        if (swiper.progress === 0) checkNewPosts();
    }

    useEffect(() => {
        addOlderPosts()
    }, []);

    if (loading) return <Spinner />;

    return (
        <div className='post-list'>
            <div className='post-list__menu'>
                <div className='post-list__menu-left'>
                    <span onClick={showMore}>user stories</span>
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
                    freeMode={{
                        enabled: true,
                        sticky: false,
                        momentumRatio: 0.4
                    }}
                >
                    {postsData && postsData?.map((post: TStory) => {
                        return <SwiperSlide key={post.id}>
                            <PostItem post={post} />
                        </SwiperSlide>
                    })}
                    {error && <ErrorSign />}
                    {loadingMorePosts && <SwiperSlide className='post-item-spinner' key='spinner'><Spinner /></SwiperSlide>}
                </Swiper>
            </div>
        </div>
    );
};

export default PostList;