import * as a from './actionsTypes';

const initialState = {
  numOfPlayers: null,
  numOfCards: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case a.CHOOSE_NUM_OF_PLAYERS: {
      return {
        ...state,
        numOfPlayers: action.numOfPlayers
      }
    }
    case a.CHOOSE_NUM_OF_CARDS: {
      return {
        ...state,
        numOfCards: action.numOfCards
      }
    }
    default:
      return state;
  }
}
