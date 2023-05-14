import { FC, useState } from 'react';
import starIcon from '../../assets/icons/starIcon.svg';
import GeneratedResultDiv from '../GeneratedResultParagraph/GeneratedResultDiv';
import ModalBase from '../ModalBase/ModalBase';
import ShareStory from '../ShareStory/ShareStory';
import './ResultStoryModal.css';

interface IResultStoryModal {
  closeModal: () => void;
  refValue: () => string;
}

const ResultStoryModal: FC<IResultStoryModal> = ({ closeModal, refValue }) => {
  const [open, setOpen] = useState(false);
  const [story, setStory] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const postStory = () => {
    setIsLoading(true);
    console.log(refValue());
    fetch('https://lobster-app-qoium.ondigitalocean.app/story/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: refValue() })
    }).then(res => {
      setStory(refValue())
      console.log(res.json())
      setIsLoading(false);
    })

    setOpen(true);
  }

  return (
    <>
      <button onClick={postStory} className='navbar__btn result-story-btn'>craft your story<img src={starIcon} alt="beautiful stars" /></button>
      <ModalBase open={open} handleClose={closeModal}>
        <GeneratedResultDiv body={story} isLoading={isLoading} />
        <ShareStory />
      </ModalBase>
    </>
  );
}

export default ResultStoryModal;
