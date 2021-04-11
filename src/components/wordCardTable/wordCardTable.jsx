import { useSelector } from 'react-redux';
import { WORD_CARD_TABLE } from '../../utils/content';

const WordCardTable = ({ deleteWord, moveToDifficult }) => {
  const displayAdditionalButtons = useSelector((state) => (
    state.control.vocabluary.settings.displayAdditionalButtons
  ));

  return (
    <table cols="6">
      <thead>
        <tr>
          <th>{WORD_CARD_TABLE.savanna}</th>
          <th>{WORD_CARD_TABLE.audiochallenge}</th>
          <th>{WORD_CARD_TABLE.sprint}</th>
          <th>{WORD_CARD_TABLE.wordConstructor}</th>
          {displayAdditionalButtons && (
          <>
            <th>{WORD_CARD_TABLE.difficult}</th>
            <th>{WORD_CARD_TABLE.delete}</th>
          </>
          )}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            {true && <i className="fas fa-check" />}
          </td>
          <td>
            {true && <i className="fas fa-check" />}
          </td>
          <td>
            {true && <i className="fas fa-check" />}
          </td>
          <td>
            {true && <i className="fas fa-check" />}
          </td>
          {displayAdditionalButtons && (
          <>
            <td>
              <button
                className="word-card__table-btn word-card__btn-difficult"
                type="button"
                onClick={moveToDifficult}
              >
                <i className="far fa-clock" />
              </button>
            </td>
            <td>
              <button
                className="word-card__table-btn word-card__btn-delete"
                type="button"
                onClick={deleteWord}
              >
                <i className="far fa-times-circle" />
              </button>
            </td>
          </>
          )}
        </tr>
      </tbody>
    </table>
  );
};

export default WordCardTable;
