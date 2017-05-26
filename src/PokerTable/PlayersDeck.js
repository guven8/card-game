import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import Card from './Card';

/* PlayersDeck receives its scoreBreakdown from the
redux connect function, it recieves its playersDeck,
playerNum, winner and draw props from its parent component
PokerTable. This component sorts the playersDeck by suit
in the sortCards function which then passes the sortedDeck
to getPlayerCards, which then renders a card for each card
in the deck. The component will repeat this process when
it receives a new playersDeck that is unequal to the current one.
The PlayersDeck will also display the card points, bonus points,
total score, player number and either "winner" or "draw".
This component doesn't require any input from the user,
it simply organises and renders the props it recieves. */

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

const mapStateToProps = (state, ownProps) => {
  const { scoreBreakdown } = state;
  return { ...scoreBreakdown[`player${ownProps.playerNum}`] }
}

export default connect(mapStateToProps)(PlayersDeck);