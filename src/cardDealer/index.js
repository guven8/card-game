import * as actions from './module/actions';
import * as constants from './module/constants';
import reducer from './module/reducer';

export { actions, constants, reducer };

/* Its the cardDealers job to shuffle and deal the cards,
that means shuffling the array of cards in the store and add an
array containing an array for each card hand in the store.
It will then call the scoreBreakdown module passing in the dealt
cards so that it can generate a score breakdown.
All of these actions are executed in one action - dealCards. */