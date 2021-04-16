/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Preloader from '../../../wordConstructor/Game/components/Preloader';
import GamesList from '../GamesList/GamesList';
import WordList from '../WordList/WordList';
import SettingsButton from '../SettingsButton/SettingsButton';
import WordCard from '../../../wordCard/wordCard';
import VocabluarySettings from '../../../vocabluarySettings/vocabluarySettings';
import { BACK_URL, DIFFICULTY_COUNT_AND_COLORS } from '../../../../utils/constants';
import './TextbookPage.scss';

const TextbookPage = ({ page, toggleSettings, isSettings }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isWordCardOpen, setIsWordCardOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentGroup, setCurrentGroup] = useState(page);
  const [words, setWords] = useState([]);
  const [currentWord, setCurrentWord] = useState(null);

  const toggleWordCard = () => {
    setIsWordCardOpen(!isWordCardOpen);
  };

  const changeCurrentWorld = (word) => {
    setCurrentWord(word);
  };

  const showNextWord = () => {
    const wordIndex = words.findIndex((el) => el.word === currentWord.word);
    setCurrentWord(words[(wordIndex + 1) % words.length]);
  };

  const showPrevWord = () => {
    const wordIndex = words.findIndex((el) => el.word === currentWord.word);
    setCurrentWord(
      wordIndex === 0
        ? words[words.length - 1]
        : words[(wordIndex - 1) % words.length],
    );
  };

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
    fetchData();
  }, [currentPage]);

  useEffect(() => {
    fetchData();
  }, [page]);

  if (isLoading) return <Preloader />;

  return (
    <main className="TextbookPage">
      <SettingsButton onClick={() => toggleSettings()} />
      <h2 className="Textbook__title" style={{ color: DIFFICULTY_COUNT_AND_COLORS[page - 1][1] }}>{`Раздел ${page}`}</h2>
      <GamesList />
      <WordList
        words={words}
        toggleWordCard={() => toggleWordCard()}
        changeCurrentWorld={changeCurrentWorld}
      />

      <ReactPaginate
        previousLabel={<i className="fa fa-arrow-left" aria-hidden="true" />}
        nextLabel={<i className="fa fa-arrow-right" aria-hidden="true" />}
        breakLabel="..."
        breakClassName="break-me"
        initialPage={currentPage}
        pageCount={30}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        onPageChange={(e) => setCurrentPage(e.selected)}
        containerClassName="TextbookPage__pagination"
        activeClassName="active"
      />

      {isWordCardOpen && (
      <WordCard
        wordData={currentWord}
        showNext={() => showNextWord()}
        showPreviouse={() => showPrevWord()}
        deleteWord={() => {}}
        moveToDifficult={() => {}}
        close={toggleWordCard}
      />
      )}
      {isSettings && (
      <VocabluarySettings close={toggleSettings} />
      )}
    </main>
  );
};

export default TextbookPage;
