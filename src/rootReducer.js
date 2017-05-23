import { combineReducers } from 'redux';
import * as gameOptions from './gameOptions';
import * as cardDealer from './cardDealer';
import * as PokerTable from './PokerTable';

export default combineReducers({
  [gameOptions.constants.NAME]: gameOptions.reducer,
  [cardDealer.constants.NAME]: cardDealer.reducer,
  [PokerTable.constants.NAME]: PokerTable.reducer
});
