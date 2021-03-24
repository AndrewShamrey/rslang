import { DO_SMTH, SET_PREV_STATE, SET_IS_AUTHORIZED } from '../actionTypes/control';

export const doSmth = (value) => ({ type: DO_SMTH, payload: value });
export const setPrevState = (prevState) => ({ type: SET_PREV_STATE, prevState });
export const setIsAuthorized = (isAuthorized) => ({
  type: SET_IS_AUTHORIZED,
  payload: isAuthorized,
});
