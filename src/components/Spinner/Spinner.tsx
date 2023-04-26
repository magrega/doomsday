import { BeatLoader } from 'react-spinners'
import './Spinner.css'

const Spinner = () => {
    return (
        <div className="spinner-container">
            <BeatLoader color="#C9E1C5" />
        </div>
    );
};

export default Spinner;