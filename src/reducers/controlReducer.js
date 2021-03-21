import produce from 'immer';
import * as ACTION_TYPES from '../actionTypes/control';

const initialState = {
  smth: 1,
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
    default:
      return state;
  }
};

export default controlReducer;
