/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import WordSoundButton from '../wordSoundButton/wordSoundButton';
import playSound from '../../utils/playSound';
import { MEDIA_URI } from '../../utils/constants';

import './statisticsList.scss';

const StatisticsList = ({ words, onItemClick }) => (
  <ul className="answers-list">
    {words.map((item) => {
      const {
        id, word, wordTranslate, audio,
      } = item;

      return (
        <li className="answers-list__item" key={id} onClick={() => onItemClick(item)}>
          <p className="answers-list__item-content">{word}</p>
          <p className="answers-list__item-content">{wordTranslate}</p>
          <WordSoundButton onClick={() => playSound(`${MEDIA_URI}${audio}`)} />
        </li>
      );
    })}
  </ul>
);

export default StatisticsList;
