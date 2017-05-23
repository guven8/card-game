import * as c from './constants';
import uuid from 'uuid';

export const getDeckOfCards = () => {
  const deck = [];
  for (let v = 0; v < c.CARD_NUMS.length; v++) {
    for (let s = 0; s < c.CARD_SUITS.length; s++) {
      deck.push({
        num: c.CARD_NUMS[v],
        suit: c.CARD_SUITS[s],
        value: getCardValue(c.CARD_NUMS[v], c.CARD_SUITS[s]),
        id: uuid.v4()
      });
    }
  }
  return deck;
}

const getCardValue = (cardNum, cardSuit) => {
  const cardNumValue = c.CARD_NUMS.indexOf(cardNum) + 1;
  const cardSuitValue = c.CARD_SUITS.indexOf(cardSuit) + 1;
  return cardNumValue + cardSuitValue;
}