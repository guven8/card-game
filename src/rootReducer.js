import { combineReducers } from 'redux';
import * as gameOptions from './gameOptions';

export default combineReducers({
  [gameOptions.constants.NAME]: gameOptions.reducer
});
