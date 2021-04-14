/* eslint-disable no-param-reassign */
import produce from 'immer';
import * as ACTION_TYPES from '../actionTypes/control';

const initialState = {
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
  wordConstructor: {
    isSound: true,
    settings: {
      isTranscription: true,
      isAutoPlay: true,
      livesByDefault: 5,
      winLevelWordCount: 6,
    },
  },
  savanna: {
    isSound: true,
    amountOfAnswers: 5,
    wordAudio: false,
    meaningQuestion: false,
    exampleQuestion: false,
  },
  isAuthorized: false,
  currentPerson: null,
};

const controlReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_PREV_STATE:
      return produce(state, (draft) => {
        draft.isAuthorized = action.prevState.isAuthorized;
        draft.currentPerson = action.prevState.currentPerson;
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
    case ACTION_TYPES.SET_WORDCONSTRUCTOR_SETTINGS:
      return produce(state, (draft) => {
        draft.wordConstructor.settings = action.payload;
      });
    case ACTION_TYPES.SET_SAVANNAH_SETTINGS:
      return produce(state, (draft) => {
        const { savanna } = draft;
        draft.savanna = { ...savanna, ...action.payload };
      });
    case ACTION_TYPES.SET_IS_AUTHORIZED:
      return produce(state, (draft) => {
        draft.isAuthorized = action.payload;
      });
    case ACTION_TYPES.SET_CURRENT_PERSON:
      return produce(state, (draft) => {
        draft.currentPerson = action.payload;
      });
    default:
      return state;
  }
};

export default controlReducer;
