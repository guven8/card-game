export const getScores = (dealtCards) => {
  const scores = [];
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
    scores.push(points);
    cardCount.push(countCards(cardNums));
  });
  cardCount.forEach((item, i) => {
    Object.keys(item).map(c => {
      if (item[c] > 1) {
        if (item[c] === 2) {
          scores[i] += 10;
          bonusPoints[i] += 10;
        } else if (item[c] === 3) {
          scores[i] += 20;
          bonusPoints[i] += 20;
        } else if (item[c] === 4) {
          scores[i] += 40;
          bonusPoints[i] += 40;
        }
      }
      return null;
    });
  });
  const highestPoints = Math.max.apply(Math, scores);
  const highestScores = scores.filter(points => points === highestPoints);
  const scoreBreakdown = {
    highestScores,
    scores
  };
  scores.forEach((player, i) => {
    Object.assign(scoreBreakdown, {
      [`player${i + 1}`]: {
        score: scores[i],
        bonusPoints: bonusPoints[i]
      }
    })
  })

  return { scoreBreakdown };
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
