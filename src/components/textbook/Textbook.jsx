import React, { useEffect, useState } from 'react';
import SettingsButton from './components/SettingsButton/SettingsButton';
import CategoryList from './components/CategoryList/CategoryList';
import TextbookPage from './components/TextbookPage/TextbookPage';
import VocabluarySettings from '../vocabluarySettings/vocabluarySettings';
import './Textbook.scss';

const Textbook = (props) => {
  const { match: { params: { section } } } = props;
  const [page, setPage] = useState(section);
  const [isSettings, setIsSettings] = useState(false);

  const toggleSettings = () => {
    setIsSettings((settings) => !settings);
  };

  useEffect(() => {
    setPage(section);
  }, [section]);

  if (page > 0) {
    return <TextbookPage page={page} isSettings={isSettings} toggleSettings={toggleSettings} />;
  }

  return (
    <div className="Textbook">
      <SettingsButton onClick={toggleSettings} />
      <h2 className="Textbook__title">Учебник</h2>
      <CategoryList />
      {isSettings && (
      <VocabluarySettings close={toggleSettings} />
      )}
    </div>
  );
};

export default Textbook;
