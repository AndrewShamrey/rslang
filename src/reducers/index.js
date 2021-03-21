import { combineReducers } from 'redux';
import controlReducer from './controlReducer';

const reducer = combineReducers({
  control: controlReducer,
});

export default reducer;
