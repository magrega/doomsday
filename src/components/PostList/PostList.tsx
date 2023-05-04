import { FC, useEffect, useState } from 'react';
import { FreeMode, Mousewheel } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { TPost, getPosts } from '../../services/getPosts';
import AddStoryModal from '../AddStoryModal/AddStoryModal';
import ErrorSign from '../ErrorSign/ErrorSign';
import PostItem from '../PostItem/PostItem';
import Spinner from '../Spinner/Spinner';
import './PostList.css';
import 'swiper/css';

export type TPostData = {
    total: number,
    posts: [{
        id: number;
        body: string;
        title: string;
        userId: number;
    }]
}

const PostList: FC = () => {
    const [limit, setLimit] = useState(10);
    const [postsData, setPostsData] = useState<TPost[] | undefined>();
    const [page, setPage] = useState(0);
    const [loadingMorePosts, setLoadingMorePosts] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const showMore = () => {
        setLoadingMorePosts(true);
        setPage(prevPage => prevPage + 1);
    }

    useEffect(() => {
        let ignore = false; 

        getPosts(page)
            .then(newPosts => newPosts.json() as Promise<TPostData>)
            .then(newPosts => {
                if (ignore) return;
                setLimit(newPosts.total);
                setPostsData(prevState => [...(prevState ?? []), ...newPosts.posts]);
                setLoadingMorePosts(false);
                setLoading(false);
            })
            .catch(e => {
                setError(true);
                console.log(e.message);
                setLoading(false);
                setLoadingMorePosts(false);
            })

            return () => {
                ignore = true;
              };
    }, [page]);

    if (loading) return <Spinner />;

    return (
        <div className="post-list">
            <div className="post-list__menu">
                <div className="post-list__menu-left">
                    <span>user stories</span>
                    <span className='disabled'>last change<span className='sticker'>soon</span></span>
                </div>
                <AddStoryModal />
            </div>
            <div className='post-list__postitem-view'>
                <Swiper
                    modules={[Mousewheel, FreeMode]}
                    mousewheel
                    spaceBetween={10}
                    slidesPerView={"auto"}
                    onTouchStart={(swiper) => { if (swiper.progress === 1 && !(swiper.slides.length === limit)) showMore() }}
                    freeMode={{
                        enabled: true,
                        sticky: false,
                        momentumRatio: 0.4
                    }}
                >
                    {error ? <ErrorSign /> : postsData?.map((post: TPost) => {
                        return <SwiperSlide key={post.id}>
                            <PostItem key={post.id} title={post.title} body={post.body} userId={post.userId} id={post.id} />
                        </SwiperSlide>
                    })}
                    {loadingMorePosts && <SwiperSlide className='post-item-spinner' key={"spinner"}><Spinner /></SwiperSlide>}
                </Swiper>
            </div>
        </div>
    );
};

export default PostList;