import * as a from './actionTypes';
import { getDealtCards, determineWinner } from './utils';

export const dealCards = ({deckOfCards, numOfPlayers, numOfCards} = {}) =>
  dispatch => {
    dispatch({
      type: a.SHUFFLE_DECK
    });
    const dealtCards = getDealtCards(deckOfCards, numOfPlayers, numOfCards);
    dispatch({
      type: a.DEAL_CARDS,
      dealtCards
    });
    dispatch({
      type: a.GET_WINNER,
      winner: determineWinner(dealtCards)
    });
  };
