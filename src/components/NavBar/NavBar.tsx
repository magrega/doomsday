import { FC } from 'react';
import { Link, To } from 'react-router-dom';
import './NavBar.css';

interface NavBarProps {
    text: string;
    to: To;
}

const NavBar: FC<NavBarProps> = ({ text, to }) => {
    return (
        <div className='navbar'>
             <Link className='home-link' to={'/'}><span>doomsday clock ai</span></Link>
            <div className='link-container'>
                <Link className='navbar__btn' to={to}>{text}</Link>
            </div>
        </div>
    );
};

export default NavBar;