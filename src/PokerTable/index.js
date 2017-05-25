import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PlayersDeck from './PlayersDeck';
import { actions as cardDealer } from '../cardDealer/index';
import './pokerTable.css';

class PokerTable extends PureComponent {
  componentWillMount() {
    this.props.shuffleDeck();
  }

  dealCards = () => {
    const { dealCards, deckOfCards, numOfPlayers, numOfCards } = this.props;
    this.props.shuffleDeck();
    dealCards({
      deckOfCards,
      numOfPlayers,
      numOfCards
    });
  }

  render() {
    const {
      numOfPlayers,
      numOfCards,
      dealtCards,
      scores,
      highestScores,
    } = this.props;
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
          {dealtCards.map((playersDeck, i) => {
            const winner = highestScores.includes(scores[i]);
            const draw = winner && highestScores.length > 1;
            return (
              <PlayersDeck
                key={i}
                playerNum={i + 1}
                playersDeck={playersDeck}
                winner={winner}
                draw={draw}
              />
            )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const {
    cardDealer: {
      deckOfCards,
      dealtCards,
    },
    scoreBreakdown: {
      scores,
      highestScores,
    },
    gameOptions: { numOfPlayers, numOfCards },
  } = state;
  return {
    deckOfCards,
    dealtCards,
    numOfPlayers,
    numOfCards,
    scores,
    highestScores
  };
};

export default connect(mapStateToProps, {
  shuffleDeck: cardDealer.shuffleDeck,
  dealCards: cardDealer.dealCards
})(PokerTable);