import { FC } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

interface NavBarProps {
    text: string;
    to: string;
  }

const NavBar: FC<NavBarProps> = ({text, to}) => {
    return (
        <div className="navbar">
            <span>doomsday clock ai</span>
            <div className="link-container">
                <Link className='navbar__a' to={to}>{text}</Link>
            </div>
        </div>
    );
};

export default NavBar;