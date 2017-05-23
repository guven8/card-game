import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PlayersDeck from './PlayersDeck';
import { actions as cardDealer } from '../../cardDealer/index';
import * as actions from '../module/actions';
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

  playAgain = () => {
    this.props.shuffleDeck();
    this.dealCards();
  }

  render() {
    const { numOfPlayers, numOfCards, dealtCards } = this.props;
    if (!numOfPlayers || !numOfCards) {
      return null;
    }
    const cardsDealt = dealtCards.length > 1;
    if (cardsDealt) {
      this.props.getWinner({ dealtCards });
    }
    return (
      <div className="poker-table">
        <div className="intro">
          <span className="title">{cardsDealt ? 'Play Again ?' : 'Ready ?'}</span>
          {!cardsDealt ?
            <button className="deal-cards" onClick={this.dealCards}>Deal Cards</button>
            :
            <button className="deal-cards" onClick={this.playAgain}>Replay</button>
          }
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
  getWinner: actions.getWinner,
  shuffleDeck: cardDealer.shuffleDeck,
  dealCards: cardDealer.dealCards
})(PokerTable);