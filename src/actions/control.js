import { DO_SMTH, SET_PREV_STATE } from '../actionTypes/control';

export const doSmth = (value) => ({ type: DO_SMTH, payload: value });
export const setPrevState = (prevState) => ({ type: SET_PREV_STATE, prevState });
