import { FC } from 'react';
import { BeatLoader } from 'react-spinners';
import styles from './Spinner.module.css';

const Spinner: FC = () => {
    return (
        <div className={styles['spinner-container']}>
            <BeatLoader color='#C9E1C5' />
        </div>
    );
};

export default Spinner;