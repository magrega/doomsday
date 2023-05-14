import { FC } from 'react';
import { BeatLoader } from 'react-spinners';
import './Spinner.css';

const Spinner: FC = () => {
    return (
        <div className='spinner-container'>
            <BeatLoader color='#C9E1C5' />
        </div>
    );
};

export default Spinner;