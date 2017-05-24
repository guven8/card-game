import { combineReducers } from 'redux';
import * as gameOptions from './gameOptions';
import * as cardDealer from './cardDealer';

export default combineReducers({
  [gameOptions.constants.NAME]: gameOptions.reducer,
  [cardDealer.constants.NAME]: cardDealer.reducer
});
