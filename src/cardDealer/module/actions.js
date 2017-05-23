import * as a from './actionTypes';
import { getDealtCards } from './utils';

export const shuffleDeck = () => ({
  type: a.SHUFFLE_DECK
});

export const dealCards = ({deckOfCards, numOfPlayers, numOfCards} ={}) => ({
  type: a.DEAL_CARDS,
  dealtCards: getDealtCards(deckOfCards, numOfPlayers, numOfCards)
})