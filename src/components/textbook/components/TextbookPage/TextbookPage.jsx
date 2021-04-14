import React, { useEffect, useState } from 'react';
import Preloader from '../../../wordConstructor/Game/components/Preloader';
import GamesList from '../GamesList/GamesList';
import './TextbookPage.scss';

const TextbookPage = ({ page }) => {
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) return <Preloader />;

  return (
    <main className="TextbookPage">
      <h2 className="Textbook__title">{`Раздел ${page}`}</h2>
      <GamesList />
    </main>
  );
};

export default TextbookPage;
