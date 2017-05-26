import * as actions from './module/actions';
import * as constants from './module/constants';
import reducer from './module/reducer';

export { actions, constants, reducer };

/* The score breakdown module is called by the cardDealer module,
it receives the cards that where dealt and outputs the breakdown
of scores and bonuses to the store to be consumed by the PokerTable
components. */