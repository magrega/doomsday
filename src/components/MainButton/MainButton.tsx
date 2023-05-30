import { FC } from 'react';
import styles from './MainButton.module.css';

interface IMainButton {
    text: string | JSX.Element;
}

const MainButton: FC<IMainButton> = ({text}) => {
    return <button className={styles.navbar__btn}>{text}</button>
};

export default MainButton;