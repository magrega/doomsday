import { FC } from 'react';
import './GeneratedResultParagraph.css';

type TGeneratedResultParagraphProp = {
    body: string | JSX.Element;
}

const GeneratedResultParagraph: FC<TGeneratedResultParagraphProp> = ({ body }) => {
    return (
        <div className='generate-result'>{body}</div>
    );
};

export default GeneratedResultParagraph;