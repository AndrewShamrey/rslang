import {
  DO_SMTH,
  SET_PREV_STATE, SET_IS_AUTHORIZED,
  SWITCH_GAME_SOUND,
  SET_AUDIOCHALLENGE_SETTINGS,
} from '../actionTypes/control';

export const doSmth = (value) => ({ type: DO_SMTH, payload: value });
export const setPrevState = (prevState) => ({ type: SET_PREV_STATE, prevState });
export const setIsAuthorized = (isAuthorized) => ({
  type: SET_IS_AUTHORIZED,
  payload: isAuthorized,
});
export const switchGameSound = (game) => ({ type: SWITCH_GAME_SOUND, payload: game });
export const setAudiochallengeSettings = (settings) => ({
  type: SET_AUDIOCHALLENGE_SETTINGS, payload: settings,
});
