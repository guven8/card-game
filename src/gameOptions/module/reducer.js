import * as a from './actionsTypes';

const initialState = {
  numOfPlayers: null,
  numOfCards: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case a.SUBMIT_GAME_OPTIONS: {
      return {
        ...state,
        numOfCards: action.numOfCards,
        numOfPlayers: action.numOfPlayers
      }
    }
    default:
      return state;
  }
}
