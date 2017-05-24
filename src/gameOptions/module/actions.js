import * as a from './actionsTypes';

export const submitGameOptions = (
  { numOfCards, numOfPlayers } = {}
  ) => ({
  type: a.SUBMIT_GAME_OPTIONS,
  numOfCards,
  numOfPlayers
});