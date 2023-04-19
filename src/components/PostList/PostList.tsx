import AddStoryModal from '../AddStoryModal/AddStoryModal';
import { FC, PropsWithChildren } from 'react'
import './PostList.css';

const PostList: FC<PropsWithChildren> = ({children}) => {
    return (
        <div className="post-list">
            <div className="post-list__menu">
                <div className="post-list__menu-left">
                    <span>user stories</span>
                    <span className='disabled'>last change <span className='sticker'>soon</span></span>
                </div>
                <AddStoryModal/>
            </div>
            <div className='post-list__postitem-view'>
            {children}
            </div>
        </div>
    );
};

export default PostList;