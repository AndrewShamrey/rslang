import React, { useEffect, useState } from 'react';
import SettingsButton from './components/SettingsButton/SettingsButton';
import CategoryList from './components/CategoryList/CategoryList';
import TextbookPage from './components/TextbookPage/TextbookPage';
import WordCard from '../wordCard/wordCard';
import VocabluarySettings from '../vocabluarySettings/vocabluarySettings';
import './Textbook.scss';

const Textbook = (props) => {
  const { match: { params: { section } } } = props;
  // location, location: { page },
  // console.log('location ', location);
  // console.log('page ', page);
  console.log('section ', section);

  const [page, setPage] = useState(section);
  const [isSettings, setIsSettings] = useState(false);
  const [isWordCardOpen, setIsWordCardOpen] = useState(false);

  const toggleSettings = () => {
    setIsSettings((settings) => !settings);
  };

  const toggleWordCard = () => {
    setIsWordCardOpen((isOpen) => !isOpen);
  };

  // mocked data for testing WordCard component
  const wordData = {
    id: '5e9f5ee35eb9e72bc21af4ca',
    group: 0,
    page: 2,
    word: 'chart',
    image: 'files/03_0043.jpg',
    audio: 'files/03_0043.mp3',
    audioMeaning: 'files/03_0043_meaning.mp3',
    audioExample: 'files/03_0043_example.mp3',
    textMeaning: 'A <i>chart</i> is a list of information.',
    textExample: 'We used a <b>chart</b> to see how we had improved.',
    transcription: '[tʃɑːrt]',
    textExampleTranslate: 'Мы использовали график, чтобы увидеть, как мы улучшили',
    textMeaningTranslate: 'Диаграмма - это список информации',
    wordTranslate: 'диаграмма',
  };

  useEffect(() => {
    setPage(section);
  }, [section]);

  if (page > 0) return <TextbookPage page={page} />;

  return (
    <div className="Textbook">
      <SettingsButton onClick={toggleSettings} />
      <h2 className="Textbook__title">Учебник</h2>
      <CategoryList />
      {isSettings && (
      <VocabluarySettings close={toggleSettings} />
      )}

      {/* {isWordCardOpen && (
      <WordCard
        wordData={wordData}
        showNext={() => {}}
        showPreviouse={() => {}}
        deleteWord={() => {}}
        moveToDifficult={() => {}}
        close={toggleWordCard}
      />
      )} */}

    </div>
  );
};

export default Textbook;
