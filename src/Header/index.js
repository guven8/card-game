import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { actions as gameOptions } from '../gameOptions';
import './header.css';

class Header extends PureComponent {
  constructor() {
    super();
    this.state = {
      _numOfPlayers: 0,
      _numOfCards: 0,
      error: false,
      errorMsg: null,
      optionsSubmitted: false
    };
  }

  updateNumOfPlayers = (e) => {
    this.setState({ error: false, errorMsg: null, optionsSubmitted: false});
    const _numOfPlayers = +e.target.value > 26 ? 26 : +e.target.value;
    this.setState({ _numOfPlayers });
    this.validateForm(_numOfPlayers, this.state._numOfCards);
  }

  updateNumOfCards = (e) => {
    this.setState({ error: false, errorMsg: null, optionsSubmitted: false});
    const _numOfCards = +e.target.value > 26 ? 26 : +e.target.value;
    this.setState({ _numOfCards });
    this.validateForm(this.state._numOfPlayers, _numOfCards);
  }

  validateForm = (numOfPlayers, numOfCards) => {
    const maxCardsAvailable = Math.floor(52 / numOfPlayers);
    if (numOfPlayers < 2) {
      this.setState({ error: true, errorMsg: 'Minimum Amount of players is 2'});
    }
    if (numOfCards > maxCardsAvailable) {
      this.setState({
        error: true,
        errorMsg: `Maximum number of cards available for ${numOfPlayers} players is ${maxCardsAvailable}`
      });
    }
  }

  submitOptions = () => {
    const numOfCards = this.state._numOfCards;
    const numOfPlayers = this.state._numOfPlayers;
    if (!this.state.error) {
      this.props.submitGameOptions({ numOfCards, numOfPlayers });
      this.setState({ optionsSubmitted: true });
    }
  }

  render() {
    const { error, errorMsg, _numOfPlayers, _numOfCards, optionsSubmitted } = this.state;
    const gameOptionsFormCards = classNames({
      'game-options-form cards': true,
      disabled: !_numOfPlayers
    });
    const submitDisabled = !_numOfPlayers || !_numOfCards || error ||optionsSubmitted;
    return (
      <div className="app-header">
        <h2>Welcome to World’s Simplest Poker</h2>
        <div className="input-options">
          <div className="game-options-form players">
            <label htmlFor="choose-players-input">Choose Number Of Players</label>
            <input
              type="number"
              id="choose-players-input"
              value={_numOfPlayers}
              onChange={this.updateNumOfPlayers}
              min="2"
              max="26"
            />
          </div>
          <div className={gameOptionsFormCards}>
            <label htmlFor="choose-cards-input">Choose Number Of Cards To Be Dealt</label>
            <input
              type="number"
              id="choose-cards-input"
              value={_numOfCards}
              onChange={this.updateNumOfCards}
              min="1"
              max="52"
            />
          </div>
          <button
            disabled={submitDisabled}
            className="submit-game-options"
            onClick={this.submitOptions}>
            submit
          </button>
          {error ? <span className="error">{errorMsg}</span> : null }
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
  submitGameOptions: gameOptions.submitGameOptions
})(Header);
