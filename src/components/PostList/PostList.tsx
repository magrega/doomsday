import { FC, useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, FreeMode } from 'swiper';
import 'swiper/css';
import { TPost, getPosts } from '../../services/getPosts';
import AddStoryModal from '../AddStoryModal/AddStoryModal';
import ErrorSign from '../ErrorSign/ErrorSign';
import PostItem from '../PostItem/PostItem';
import Spinner from '../Spinner/Spinner';
import './PostList.css';

export type TPostData = {
    posts: [{
        body: string;
        id: number;
        title: string;
        userId: number;
    }]
}

const PostList: FC = () => {

    const [postsData, setPostsData] = useState<TPost[] | undefined>();
    const [page, setPage] = useState(0);
    const [loadingMorePosts, setLoadingMorePosts] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const isShowMoreRunning = useRef(false);

    // const showMore = useCallback(() => { 
    //     setLoadingMorePosts(true);
    //     setPage(prevPage => prevPage + 1);
    //     console.log("SHOWMORE");
    // }, [setLoadingMorePosts])

    const showMore = () => {
        if (!isShowMoreRunning.current) {
            isShowMoreRunning.current = true;
            setLoadingMorePosts(true);
            setPage(prevPage => prevPage + 1);
        }
    };

    useEffect(() => {
        getPosts(page)
            .then(newPosts => newPosts.json() as Promise<TPostData>)
            .then(newPosts => {
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
    }, [page]);

    useEffect(() => {
        isShowMoreRunning.current = false;
    }, [postsData]);

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
                    spaceBetween={10}
                    slidesPerView={"auto"}
                    touchMoveStopPropagation={true}
                    onReachEnd={showMore}
                    freeMode={{
                        enabled: true,
                        sticky: false,
                        momentumRatio: 0.3
                    }}
                    mousewheel={{
                        forceToAxis: false,
                        sensitivity: 1,
                        releaseOnEdges: true,
                      }}
                      modules={[Mousewheel, FreeMode]}
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