import * as a from './actionsTypes';

export const chooseNumOfPlayers = ({numOfPlayers} = {}) => ({
  type: a.CHOOSE_NUM_OF_PLAYERS,
  numOfPlayers
});

export const chooseNumOfCards = ({numOfCards} = {}) => ({
  type: a.CHOOSE_NUM_OF_CARDS,
  numOfCards
});

export const resetGame = () => ({
  type: a.RESET_GAME
});