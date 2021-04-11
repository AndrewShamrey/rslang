/* eslint-disable no-param-reassign */
import produce from 'immer';
import * as ACTION_TYPES from '../actionTypes/control';

const initialState = {
  smth: 1,
  audiochallenge: {
    isSound: true,
    amountOfAnswers: 5,
    transcriptionQuestion: false,
    meaningQuestion: false,
    exampleQuestion: false,
    transcriptionAnswer: false,
    meaningAnswer: false,
    meaningTranslateAnswer: false,
    exampleAnswer: false,
    exampleTranslateAnswer: false,
  },
  sprint: {
    isSound: true,
  },
  vocabluary: {
    settings: {
      displayAdditionalButtons: true,
      displayTranslations: true,
    },
  },
};

const controlReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.DO_SMTH:
      return produce(state, (draft) => {
        draft.smth = state.smth + action.payload;
      });
    case ACTION_TYPES.SET_PREV_STATE:
      return produce(state, (draft) => {
        draft.smth = action.prevState.smth;
      });
    case ACTION_TYPES.SWITCH_GAME_SOUND:
      return produce(state, (draft) => {
        draft[action.payload].isSound = !draft[action.payload].isSound;
      });
    case ACTION_TYPES.SET_AUDIOCHALLENGE_SETTINGS:
      return produce(state, (draft) => {
        const { audiochallenge } = draft;
        draft.audiochallenge = { ...audiochallenge, ...action.payload };
      });
    case ACTION_TYPES.SET_SPRINT_SETTINGS:
      return produce(state, (draft) => {
        const { sprint } = draft;
        draft.sprint = { ...sprint, ...action.payload };
      });
    case ACTION_TYPES.SET_VOCABLUARY_SETTINGS:
      return produce(state, (draft) => {
        draft.vocabluary.settings = action.payload;
      });
    default:
      return state;
  }
};

export default controlReducer;
