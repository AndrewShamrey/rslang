/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Preloader from '../../../wordConstructor/Game/components/Preloader';
import GamesList from '../GamesList/GamesList';
import WordList from '../WordList/WordList';
import SettingsButton from '../SettingsButton/SettingsButton';
import WordCard from '../../../wordCard/wordCard';
import { BACK_URL, RSLANG_DATA_URL } from '../../../../utils/constants';
import './TextbookPage.scss';

const TextbookPage = ({ page }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isWordCardOpen, setIsWordCardOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentGroup, setCurrentGroup] = useState(page);
  const [words, setWords] = useState([]);

  async function fetchData() {
    await setIsLoading(true);
    const data = await fetch(`${BACK_URL}/words?page=${currentPage}&group=${currentGroup}`).then((d) => d.json());
    await setWords(data);
    await setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log('words ', words);
  }, [words]);

  useEffect(() => {
    // setIsLoading(true);
    fetchData();
  }, [page]);

  if (isLoading) return <Preloader />;

  return (
    <main className="TextbookPage">
      <SettingsButton />
      <h2 className="Textbook__title">{`Раздел ${page}`}</h2>
      <GamesList />
      <WordList words={words} />

      {/* {isWordCardOpen && (
      <WordCard
        wordData={words[0]}
        showNext={() => {}}
        showPreviouse={() => {}}
        deleteWord={() => {}}
        moveToDifficult={() => {}}
        close={setIsWordCardOpen(!isWordCardOpen)}
      />
      )} */}
    </main>
  );
};

export default TextbookPage;
