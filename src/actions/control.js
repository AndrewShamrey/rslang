import {
  SET_PREV_STATE,
  SET_CURRENT_PERSON,
  SET_IS_AUTHORIZED,
  SWITCH_GAME_SOUND,
  SET_AUDIOCHALLENGE_SETTINGS,
  SET_VOCABLUARY_SETTINGS,
  SET_WORDCONSTRUCTOR_SETTINGS,
} from '../actionTypes/control';

export const setPrevState = (prevState) => ({ type: SET_PREV_STATE, prevState });
export const setCurrentPerson = (person) => ({
  type: SET_CURRENT_PERSON,
  payload: person,
});
export const setIsAuthorized = (isAuthorized) => ({
  type: SET_IS_AUTHORIZED,
  payload: isAuthorized,
});
export const switchGameSound = (game) => ({ type: SWITCH_GAME_SOUND, payload: game });
export const setAudiochallengeSettings = (settings) => ({
  type: SET_AUDIOCHALLENGE_SETTINGS,
  payload: settings,
});
export const setVocabluarySettings = (settings) => ({
  type: SET_VOCABLUARY_SETTINGS,
  payload: settings,
});
export const setWordConstructorSettings = (settings) => ({
  type: SET_WORDCONSTRUCTOR_SETTINGS,
  payload: settings,
});
