import * as a from './actionTypes';
import { determineWinner } from './utils';

export const getWinner = ({ dealtCards } = {}) => ({
  type: a.GET_WINNER,
  winner: determineWinner(dealtCards)
});