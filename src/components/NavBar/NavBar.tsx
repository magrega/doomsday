import { FC } from 'react';
import { Link, To } from 'react-router-dom';
import MainButton from '../MainButton/MainButton';
import styles from './NavBar.module.css';

interface NavBarProps {
    text: string;
    to: To;
    aboutPage?: boolean;
}

const NavBar: FC<NavBarProps> = ({ text, to, aboutPage }) => {
    return (
        <div className={styles.navbar}>
             <Link className={styles['home-link']} to={'/'}><span className={styles.navbar__title}>doomsday clock ai</span></Link>
            <div className={aboutPage ? styles['link-container-aboutpage'] : styles['link-container']}>
                <Link to={to}><MainButton text={text}/></Link>
            </div>
        </div>
    );
};

export default NavBar;