export const determineWinner = (dealtCards) => {
  const playerPoints = [];
  dealtCards.forEach(card => {
    let points = 0;
    for (let i = 0; i < card.length; i++) {
      points += +card[i].value;
    }
    playerPoints.push(points);
  });
  const highestPoints = Math.max.apply(Math, playerPoints);
  const winner = playerPoints.indexOf(highestPoints);
  return winner + 1;
};
