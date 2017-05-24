import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PlayersDeck from './PlayersDeck';
import { actions as cardDealer } from '../../cardDealer';
import '../pokerTable.css';

class PokerTable extends PureComponent {
  dealCards = () => {
    const { dealCards, deckOfCards, numOfPlayers, numOfCards } = this.props;
    dealCards({
      deckOfCards,
      numOfPlayers,
      numOfCards
    });
  }

  render() {
    const { numOfPlayers, numOfCards, dealtCards } = this.props;
    if (!numOfPlayers || !numOfCards) {
      return null;
    }
    const cardsDealt = dealtCards.length > 0;
    return (
      <div className="poker-table">
        <div className="intro">
          <span className="title">
            {cardsDealt ? 'Play Again ?' : 'Ready ?'}
          </span>
            <button className="deal-cards" onClick={this.dealCards}>
              {cardsDealt ? 'Replay ?' : 'Deal Cards'}
            </button>
        </div>
        <div className="card-container">
          {dealtCards.map((playersDeck, i) =>
            <PlayersDeck
              key={i}
              playerNum={i + 1}
              playersDeck={playersDeck}
            />
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const {
    cardDealer: { deckOfCards, dealtCards },
    gameOptions: { numOfPlayers, numOfCards },
  } = state;
  return { deckOfCards, dealtCards, numOfPlayers, numOfCards };
};

export default connect(mapStateToProps, {
  dealCards: cardDealer.dealCards
})(PokerTable);