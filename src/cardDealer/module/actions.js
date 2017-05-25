import * as a from './actionTypes';
import { getDealtCards } from './utils';
import { actions as scoreBreakdownActions } from '../../scoreBreakdown';

export const shuffleDeck = () => ({
  type: a.SHUFFLE_DECK
});

export const dealCards = ({deckOfCards, numOfPlayers, numOfCards} = {}) =>
  dispatch => {
    const dealtCards = getDealtCards(deckOfCards, numOfPlayers, numOfCards);
    dispatch({
      type: a.DEAL_CARDS,
      dealtCards
    });
    dispatch(scoreBreakdownActions.getScoreBreakdown({dealtCards}));
  };
