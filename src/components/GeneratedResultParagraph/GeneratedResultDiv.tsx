import { FC } from 'react';
import './GeneratedResultDiv.css';

type TGeneratedResultDivProp = {
    body: string;
}

const GeneratedResultDiv: FC<TGeneratedResultDivProp> = ({ body }) => {
    return (
        <div className='generate-result'>{body}</div>
    );
};

export default GeneratedResultDiv;