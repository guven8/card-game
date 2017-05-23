import * as a from './actionTypes';
import { shuffle } from 'lodash';
import { getDeckOfCards } from './utils'

const initialState = {
  deckOfCards: getDeckOfCards()
}

export default (state = initialState, action) => {
  switch (action.type) {
    case a.SHUFFLE_DECK:
      return {
        ...state,
        deckOfCards: shuffle(state.deckOfCards)
      }
    default:
      return state;
  }
}