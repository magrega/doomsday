import { FC } from 'react';
import Clock from '../Clock/Clock';
import NavBar from '../NavBar/NavBar';
import PostList from '../PostList/PostList';
import './MainPage.css';

const MainPage: FC = () => {
    return (
            <div className='main-page'>
                <NavBar text='About' to='/about' />
                <Clock />
                <p className='undertext'>ticking towards the AGI super intelligence singularity</p>
                <PostList />
            </div>
    );
};

export default MainPage;