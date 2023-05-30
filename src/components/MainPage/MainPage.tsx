import { FC, PropsWithChildren } from 'react';
import Clock from '../Clock/Clock';
import NavBar from '../NavBar/NavBar';
import PostList from '../PostList/PostList';
import pic1 from '../../assets/img/pic1.png';
import pic2 from '../../assets/img/pic2.png';
import styles from './MainPage.module.css';

const MainPage: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className={styles['main-page']}>
            <NavBar text='about' to='/about' />
            <div className={styles['clock-wrapper']}>
                <div>
                    <Clock />
                    <p className={styles.undertext}>ticking towards the AGI super intelligence singularity</p>
                </div>
                <div className={styles['futuristic-pics']}>
                    <img className={styles['futuristic-pic']} src={pic1} alt="futuristic 1" />
                    <img className={styles['futuristic-pic']} src={pic2} alt="futuristic 2" />
                </div>
            </div>
            <PostList />
            {children}
        </div>
    );
};

export default MainPage;