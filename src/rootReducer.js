import { combineReducers } from 'redux';
import * as gameOptions from './gameOptions';
import * as cardDealer from './cardDealer';
import * as scoreBreakdown from './scoreBreakdown';

export default combineReducers({
  [gameOptions.constants.NAME]: gameOptions.reducer,
  [cardDealer.constants.NAME]: cardDealer.reducer,
  [scoreBreakdown.constants.NAME]: scoreBreakdown.reducer
});
