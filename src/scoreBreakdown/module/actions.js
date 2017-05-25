import * as a from './actionTypes';
import { getScores } from './utils';

export const getScoreBreakdown = ({ dealtCards }) => ({
  type: a.GET_SCORE_BREAKDOWN,
  ...getScores(dealtCards)
});