import * as a from './actionTypes';
import { getDealtCards, determineWinner } from './utils';

const shuffleDeck = () => ({
  type: a.SHUFFLE_DECK
});

const getWinner = ({ dealtCards } = {}) => ({
  type: a.GET_WINNER,
  winner: determineWinner(dealtCards)
});

export const dealCards = ({deckOfCards, numOfPlayers, numOfCards} = {}) =>
  dispatch => {
    const dealtCards = getDealtCards(deckOfCards, numOfPlayers, numOfCards);
    dispatch({
      type: a.DEAL_CARDS,
      dealtCards
    });
    dispatch(shuffleDeck())
    dispatch(getWinner({ dealtCards }));
  };
