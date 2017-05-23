import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
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
      orderedSuits.indexOf(a.suit) > orderedSuits.indexOf(b.suit)
    )
    this.getPlayersCards(orderedDeck);
  }

  getPlayersCards = (deck) => {
    let totalScore = 0;
    const cards = deck.map(card => {
      totalScore += card.value;
      return (
        <Card
          key={card.id}
          num={card.num}
          suit={card.suit}
          value={card.value}
        />
      )
    });
    this.cards = cards
    this.totalScore = totalScore;
  }

  render() {
    const { playerNum, winner } = this.props;
    return (
      <div className="players-deck">
        <span className="player-num">Player: {playerNum}</span>
        {winner === playerNum ? <span className="winner">Winner</span> : null }
        <span className="total-score">Total Score: {this.totalScore}</span>
        {this.cards}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { pokerTable: { winner } } = state;
  return { winner };
};

export default connect(mapStateToProps)(PlayersDeck);