import * as a from './actionTypes';
import { shuffle } from 'lodash';
import { getDeckOfCards } from './utils'

const initialState = {
  deckOfCards: getDeckOfCards(),
  dealtCards: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case a.SHUFFLE_DECK:
      return {
        ...state,
        deckOfCards: shuffle(state.deckOfCards)
      }
    case a.DEAL_CARDS:
      return {
        ...state,
        dealtCards: action.dealtCards
      }
    case a.GET_SCORES:
      return {
        ...state,
        highestScores: action.highestScores,
        scores: action.scores,
        bonusPoints: action.bonusPoints
      }
    default:
      return state;
  }
};
