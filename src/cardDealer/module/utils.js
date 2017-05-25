import * as c from './constants';
import uuid from 'uuid';
import { chunk } from 'lodash';

export const getDeckOfCards = () => {
  const deck = [];
  for (let v = 0; v < c.CARD_NUMS.length; v++) {
    for (let s = 0; s < c.CARD_SUITS.length; s++) {
      deck.push({
        num: c.CARD_NUMS[v],
        suit: c.CARD_SUITS[s],
        value: c.CARD_NUMS.indexOf(c.CARD_NUMS[v]) + 1,
        id: uuid.v4()
      });
    }
  }
  return deck;
};

export const getDealtCards = (cards, numOfPlayers, numOfCards) => {
  const totalNumCards = +numOfPlayers * +numOfCards;
  var cardsToBeDealt = [];
  for (let i = 0; i < totalNumCards; i++) {
      cardsToBeDealt.push(cards[i])
  }
  return chunk(cardsToBeDealt, numOfCards);
};

