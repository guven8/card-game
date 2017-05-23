import * as a from './actionTypes';

const initialState = {
  winner: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case a.GET_WINNER:
      return {
        ...state,
        winner: action.winner
      }
    default:
      return state;
  }
};
