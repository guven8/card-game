import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Card from './Card';
import * as actions from '../module/actions';

class PlayersDeck extends PureComponent {
  sortCards = (deck) => {
    const orderedSuits = [ 'hearts', 'spades', 'diamonds', 'clubs' ];
    return deck.sort((a, b) =>
      orderedSuits.indexOf(a.suit) > orderedSuits.indexOf(b.suit)
    )
  }

  componentDidMount() {
    const { playersDeck } = this.props;
    this.props.getWinner({ dealtCards: playersDeck });
  }

  render() {
    const { playersDeck, playerNum, winner } = this.props;
    const orderedDeck = this.sortCards(playersDeck);
    return (
      <div className="players-deck">
        <span className="player-num">Player: {playerNum}</span>
        {winner === playerNum ? <span className="winner">Winner</span> : null }
        {orderedDeck.map(card =>
          <Card
            key={card.id}
            num={card.num}
            suit={card.suit}
            value={card.value}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { pokerTable: { winner } } = state;
  return { winner };
};

export default connect(mapStateToProps, {
  getWinner: actions.getWinner
})(PlayersDeck);