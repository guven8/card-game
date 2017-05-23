import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Card from './Card';
import { actions as cardDealer } from '../cardDealer';
import './pokerTable.css';

class PokerTable extends PureComponent {
  render() {
    return (
      <div className="poker-table">
        <span>welcome to the poker table</span>
        <div className="card-container">
          {this.props.deckOfCards.map(card =>
            <Card
              num={card.num}
              suit={card.suit}
              key={card.id}
              value={card.value}
            />
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { deckOfCards } = state.cardDealer;
  return { deckOfCards };
};

export default connect(mapStateToProps, {
  shuffleDeck: cardDealer.shuffleDeck
})(PokerTable);