import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { actions as gameOptions } from '../gameOptions';
import { actions as cardDealer } from '../cardDealer';
import './header.css';

class Header extends PureComponent {
  constructor() {
    super();
    this.state = { _numOfPlayers: 0, _numOfCards: 0, error: false, errorMsg: null, optionsSubmitted: false };
  }

  componentWillMount() {
    this.props.shuffleDeck();
  }

  updateNumOfPlayers = (e) => {
    this.setState({ error: false, errorMsg: null, optionsSubmitted: false});
    const _numOfPlayers = e.target.value;
    this.setState({ _numOfPlayers });

    if (_numOfPlayers > 26) {
      this.setState({ error: true, errorMsg: 'Maximum Amount of players is 26' });
    } else if (_numOfPlayers < 2) {
      this.setState({ error: true, errorMsg: 'Minimum Amount of players is 2' });
    }
  }

  updateNumOfCards = (e) => {
    this.setState({ error: false, errorMsg: null, optionsSubmitted: false});
    const { _numOfPlayers } = this.state;
    const _numOfCards = +e.target.value;
    const maxCardsAvailable = Math.floor(52 / _numOfPlayers);

    if (_numOfCards > maxCardsAvailable) {
      this.setState({
        error: true,
        errorMsg: `Maximum number of cards available for ${_numOfPlayers} players is ${maxCardsAvailable}`
      });
    } else {
      this.setState({ _numOfCards });
    }
  }

  submitOptions = () => {
    const numOfCards = this.state._numOfCards;
    const numOfPlayers = this.state._numOfPlayers;
    if (!this.state.error) {
      this.props.chooseNumOfCards({ numOfCards });
      this.props.chooseNumOfPlayers({ numOfPlayers });
      this.setState({ optionsSubmitted: true });
    }
  }

  render() {
    const { error, errorMsg, _numOfPlayers, _numOfCards, optionsSubmitted } = this.state;
    const gameOptionsFormCards = classNames({
      'game-options-form cards': true,
      disabled: !_numOfPlayers || error
    });
    const submitDisabled = !_numOfPlayers || !_numOfCards || error ||optionsSubmitted;
    return (
      <div className="app-header">
        <h2>Welcome to World’s Simplest Poker</h2>
        <div className="input-options">
          <div className="game-options-form players">
            <label htmlFor="choose-players-input">Choose Number Of Players</label>
            <input type="number" id="choose-players-input" onChange={this.updateNumOfPlayers}/>
          </div>
          <div className={gameOptionsFormCards}>
            <label htmlFor="choose-cards-input">Choose Number Of Cards To Be Dealt</label>
            <input type="number" id="choose-cards-input" onChange={this.updateNumOfCards}/>
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
  shuffleDeck: cardDealer.shuffleDeck,
  chooseNumOfPlayers: gameOptions.chooseNumOfPlayers,
  chooseNumOfCards: gameOptions.chooseNumOfCards
})(Header);
