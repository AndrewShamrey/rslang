import { START_PAGE } from '../../utils/content';
import './startPage.scss';

const StartPage = ({ startGame, changeLevel, game }) => {
  const { level, start, [game]: { title, description } } = START_PAGE;
  return (
    <div className="start-page__about">
      <h1 className="start-page__header">{title}</h1>
      <p className="start-page__description">{description}</p>
      <select className="start-page__select" onChange={changeLevel}>
        <option value="1">{`${level} 1`}</option>
        <option value="2">{`${level} 2`}</option>
        <option value="3">{`${level} 3`}</option>
        <option value="4">{`${level} 4`}</option>
        <option value="5">{`${level} 5`}</option>
        <option value="6">{`${level} 6`}</option>
      </select>
      <button
        className="start-page__start"
        onClick={startGame}
        type="button"
      >
        {start}
      </button>
    </div>
  );
};

export default StartPage;
