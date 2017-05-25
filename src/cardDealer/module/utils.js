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

export const getScores = (dealtCards) => {
  const playerPoints = [];
  const cardCount = [];
  const bonusPoints = [];
  dealtCards.forEach(card => {
    let points = 0;
    let cardNums = [];
    for (let i = 0; i < card.length; i++) {
      points += +card[i].value;
      cardNums.push(card[i].num);
    }
    bonusPoints.push(0);
    playerPoints.push(points);
    cardCount.push(countCards(cardNums));
  });
  cardCount.forEach((item, i) => {
    Object.keys(item).map(c => {
      if (item[c] > 1) {
        if (item[c] === 2) {
          playerPoints[i] += 10;
          bonusPoints[i] += 10;
        } else if (item[c] === 3) {
          playerPoints[i] += 20;
          bonusPoints[i] += 20;
        } else if (item[c] === 4) {
          playerPoints[i] += 40;
          bonusPoints[i] += 40;
        }
      }
      return null;
    });
  });
  const highestPoints = Math.max.apply(Math, playerPoints);
  const highestScores = playerPoints.filter(points => points === highestPoints);
  const breakDown = {
    highestScores,
    bonusPoints,
    scores: playerPoints
  };
  return breakDown;
};

const countCards = (cards) => {
  const countedCards = cards.reduce((allCards, card) => {
    if (card in allCards) {
      allCards[card]++;
    }
    else {
      allCards[card] = 1;
    }
    return allCards;
  }, {});
  return countedCards;
}
