import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actions as gameOptions } from '../gameOptions';
import './header.css';

class Header extends PureComponent {
  render() {
    return (
      <div className="App-header">
        <h2>Welcome to World’s Simplest Poker</h2>
        <div className="input-options">
          <div className="choose-cards">
            <label htmlFor="choose-cards-input">Choose Number Of Cards To Be Dealt</label>
            <input type="text" id="choose-cards-input"/>
          </div>
          <div className="choose-players">
            <label htmlFor="choose-players-input">Choose Number Of Players</label>
            <input type="text" id="choose-players-input"/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { gameOptions: { noOfPlayers, noOfCards } } = state;
  return { noOfPlayers, noOfCards };
};

export default connect(mapStateToProps, {
  chooseNumOfPlayers: gameOptions.chooseNumOfPlayers,
  chooseNumOfCards: gameOptions.chooseNumOfCards
})(Header);
