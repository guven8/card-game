import React, { PureComponent } from 'react';
import { isEqual } from 'lodash';
import Card from './Card';

class PlayersDeck extends PureComponent {
  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.playersDeck, nextProps.playersDeck)) {
      this.sortCards(nextProps.playersDeck);
    }
  }

  componentWillMount() {
    this.sortCards(this.props.playersDeck)
  }

  sortCards = (deck) => {
    const orderedSuits = [ 'hearts', 'spades', 'diamonds', 'clubs' ];
    const orderedDeck = deck.sort((a, b) =>
      orderedSuits.indexOf(a.suit) - orderedSuits.indexOf(b.suit)
    )
    this.getPlayersCards(orderedDeck);
  }

  getPlayersCards = (deck) => {
    let totalDeckValue = 0;
    const cards = deck.map(card => {
      totalDeckValue += card.value;
      return (
        <Card
          key={card.id}
          num={card.num}
          suit={card.suit}
          value={card.value}
        />
      )
    });
    this.cards = cards;
    this.totalDeckValue = totalDeckValue;
  }

  render() {
    const { playerNum, winner, draw, score, bonusPoints } = this.props;
    return (
      <div className="players-deck">
        <span className="player-num">Player: {playerNum}</span>
        {winner && !draw ? <span className="winner">Winner!</span> : null }
        {draw ? <span className="draw">Draw!</span> : null }
        <div className="points-info">
          <span>Card Points: {this.totalDeckValue}</span>
          <span>Bonus Points: {bonusPoints}</span>
          <span className="total-score">Total Score: {score}</span>
        </div>
        {this.cards}
      </div>
    );
  }
}

export default PlayersDeck;