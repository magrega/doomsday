import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Clock from '../Clock/Clock';
import NavBar from '../NavBar/NavBar';
import PostItem from '../PostItem/PostItem';
import PostList from '../PostList/PostList';
import './MainPage.css';
import 'swiper/css';

const MainPage: FC = () => {
    return (
        <>
        <div className='main-page'>
            <NavBar text={"About"} to='/about' />
            <Clock />
            <p className='undertext'>ticking towards the AGI super intelligence singularity</p>
            <PostList>
                <Swiper
                    spaceBetween={10}
                    slidesPerView={"auto"}
                    grabCursor={true}
                    touchMoveStopPropagation={true}
                >
                    <SwiperSlide><PostItem /></SwiperSlide>
                    <SwiperSlide><PostItem /></SwiperSlide>
                    <SwiperSlide><PostItem /></SwiperSlide>
                    <SwiperSlide><PostItem /></SwiperSlide>
                    <SwiperSlide><PostItem /></SwiperSlide>
                    <SwiperSlide><PostItem /></SwiperSlide>
                    <SwiperSlide><PostItem /></SwiperSlide>                    
                </Swiper>
            </PostList>
        </div>
        </>
    );
};

export default MainPage;