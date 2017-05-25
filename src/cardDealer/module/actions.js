import * as a from './actionTypes';
import { getDealtCards, getScores } from './utils';

export const shuffleDeck = () => ({
  type: a.SHUFFLE_DECK
});

export const dealCards = ({deckOfCards, numOfPlayers, numOfCards} = {}) =>
  dispatch => {
    const dealtCards = getDealtCards(deckOfCards, numOfPlayers, numOfCards);
    dispatch({
      type: a.DEAL_CARDS,
      dealtCards
    });
    dispatch({
      type: a.GET_SCORES,
      ...getScores(dealtCards)
    });
  };
