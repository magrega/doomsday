import { FC, useCallback, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getPosts } from '../../services/getPosts';
import AddStoryModal from '../AddStoryModal/AddStoryModal';
import PostItem from '../PostItem/PostItem';
import Spinner from '../Spinner/Spinner';
import { TPost } from '../../services/getPosts';
import 'swiper/css';
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

    const [postsData, setPostsData] = useState<TPostData | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    const updatePostsFromServer = useCallback(() => {
        getPosts()
            .then(newPosts => newPosts.json() as Promise<TPostData>)
            .then(newPosts => {
                setPostsData(newPosts)
                setLoading(false);
            })
            .catch(e => {
                console.log(e.message);
            })
    }, []);

    useEffect(() => { updatePostsFromServer() }, [updatePostsFromServer]);

    if (loading) {
        return <Spinner />;
    }

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
                    grabCursor={true}
                    touchMoveStopPropagation={true}
                >
                    {postsData?.posts.map((post: TPost) => {
                        return <SwiperSlide key={post.id}>
                            <PostItem key={post.id} title={post.title} body={post.body} userId={post.userId} />
                        </SwiperSlide>
                    })}
                </Swiper>
            </div>
        </div>
    );
};

export default PostList;