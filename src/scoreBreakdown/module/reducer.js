import * as a from './actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case a.GET_SCORE_BREAKDOWN:
      return action.scoreBreakdown
    default:
      return state;
  }
};
