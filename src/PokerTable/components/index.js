import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PlayersDeck from './PlayersDeck';
import { actions as cardDealer } from '../../cardDealer/index';
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

    return (
      <div className="poker-table">
        <div className="intro">
          <span className="title">Ready ?</span>
          <button className="deal-cards" onClick={this.dealCards}>Reveal Cards</button>
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