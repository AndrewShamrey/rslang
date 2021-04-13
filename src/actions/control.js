import {
  DO_SMTH,
  SET_PREV_STATE,
  SET_IS_AUTHORIZED,
  SWITCH_GAME_SOUND,
  SET_AUDIOCHALLENGE_SETTINGS,
  SET_SPRINT_SETTINGS,
  SET_VOCABLUARY_SETTINGS,
  SET_WORDCONSTRUCTOR_SETTINGS,
} from '../actionTypes/control';

export const doSmth = (value) => ({ type: DO_SMTH, payload: value });
export const setPrevState = (prevState) => ({ type: SET_PREV_STATE, prevState });
export const setIsAuthorized = (isAuthorized) => ({
  type: SET_IS_AUTHORIZED,
  payload: isAuthorized,
});
export const switchGameSound = (game) => ({ type: SWITCH_GAME_SOUND, payload: game });
export const setAudiochallengeSettings = (settings) => ({
  type: SET_AUDIOCHALLENGE_SETTINGS,
  payload: settings,
});
export const setSprintSettings = (settings) => ({
  type: SET_SPRINT_SETTINGS, payload: settings,
});
export const setVocabluarySettings = (settings) => ({
  type: SET_VOCABLUARY_SETTINGS,
  payload: settings,
});
export const setWordConstructorSettings = (settings) => ({
  type: SET_WORDCONSTRUCTOR_SETTINGS,
  payload: settings,
});
