import * as a from './actionsTypes';

const initialState = {
  noOfPlayers: null,
  noOfCards: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case a.CHOOSE_NUM_OF_PLAYERS: {
      return {
        ...state,
        noOfPlayers: action.noOfPlayers
      }
    }
    case a.CHOOSE_NUM_OF_CARDS: {
      return {
        ...state,
        noOfCards: action.noOfCards
      }
    }
    default:
      return state;
  }
}
