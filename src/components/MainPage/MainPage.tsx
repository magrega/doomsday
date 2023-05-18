import { FC } from 'react';
import Clock from '../Clock/Clock';
import NavBar from '../NavBar/NavBar';
import PostList from '../PostList/PostList';
import './MainPage.css';
import pic1 from '../../assets/img/pic1.png';
import pic2 from '../../assets/img/pic2.png';

const MainPage: FC = () => {
    return (
        <div className='main-page'>
            <NavBar text='About' to='/about' />
            <div className='clock-wrapper'>
                <div>
                    <Clock />
                    <p className='undertext'>ticking towards the AGI super intelligence singularity</p>
                </div>
                <div className='futuristic-pics'>
                    <img className='futuristic-pics-1' src={pic1} alt="pic1" />
                    <img className='futuristic-pics-2' src={pic2} alt="pic2" />
                </div>
            </div>
            <PostList />
        </div>
    );
};

export default MainPage;