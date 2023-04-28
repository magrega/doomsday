import { FC } from 'react';
import './GeneratedResultParagraph.css';

type TGeneratedResultParagraphProp = {
    body: string | JSX.Element;
}

const GeneratedResultParagraph: FC<TGeneratedResultParagraphProp> = ({ body }) => {
    return (
        <p className='generate-result'>{body}</p>
    );
};

export default GeneratedResultParagraph;