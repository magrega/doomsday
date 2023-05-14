import { FC } from 'react';
import './GeneratedResultDiv.css';
import Spinner from '../Spinner/Spinner';

type TGeneratedResultDivProp = {
    body: string | undefined;
    isLoading?: boolean;
}

const GeneratedResultDiv: FC<TGeneratedResultDivProp> = ({ body, isLoading }) => {
    return (
        <>
        {isLoading && <Spinner/>}
        {body && <div className='generate-result'>{body}</div>}
        </>
    );
};

export default GeneratedResultDiv;