import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { actions as gameOptions } from '../gameOptions';
import './header.css';

class Header extends PureComponent {
  constructor() {
    super();
    this.state = { _numOfPlayers: 0, _numOfCards: 0, error: false };
  }

  updateNumOfPlayers = (e) => {
    this.setState({ error: false });
    this.setState({ _numOfPlayers: e.target.value });
  }

  submitNumOfPlayers = (e) => {
    e.preventDefault();
    const numOfPlayers = this.state._numOfPlayers

    if (numOfPlayers > 52) {
      this.setState({ error: 'Maximum Amount of players is 52' });
    } else if (numOfPlayers < 2) {
      this.setState({ error: 'Minimum Amount of players is 2' });
    } else {
      this.props.chooseNumOfPlayers({ numOfPlayers });
    }
  }

  updateNumOfCards = (e) => {
    this.setState({ _numOfCards: e.target.value });
    console.log(this.props.numOfPlayers / e.target.value);
  }

  submitNumOfCards = (e) => {
    e.preventDefault();
    const numOfCards = this.state._numOfCards
    this.props.chooseNumOfCards({ numOfCards });
  }

  render() {
    const { error } = this.state;
    const { numOfPlayers } = this.props;
    const gameOptionsFormCards = classNames({
      'game-options-form cards': true,
      disabled: !numOfPlayers
    });
    return (
      <div className="App-header">
        <h2>Welcome to World’s Simplest Poker</h2>
        <div className="input-options">
          <form className="game-options-form players" onSubmit={this.submitNumOfPlayers}>
            <label htmlFor="choose-players-input">Choose Number Of Players</label>
            <input type="number" id="choose-players-input" onChange={this.updateNumOfPlayers}/>
          </form>
          <form className={gameOptionsFormCards} onSubmit={this.submitNumOfCards}>
            <label htmlFor="choose-cards-input">Choose Number Of Cards To Be Dealt</label>
            <input type="number" id="choose-cards-input" onChange={this.updateNumOfCards}/>
          </form>
          {error ? <span className="error">{error}</span> : null }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { gameOptions: { numOfPlayers, numOfCards } } = state;
  return { numOfPlayers, numOfCards };
};

export default connect(mapStateToProps, {
  chooseNumOfPlayers: gameOptions.chooseNumOfPlayers,
  chooseNumOfCards: gameOptions.chooseNumOfCards
})(Header);
