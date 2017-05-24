import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { actions as gameOptions } from '../gameOptions';
import { actions as cardDealer } from '../cardDealer';
import './header.css';

class Header extends PureComponent {
  constructor() {
    super();
    this.state = { _numOfPlayers: null, _numOfCards: null, error: false, errorMsg: null, optionsSubmitted: false };
  }

  componentWillMount() {
    this.props.shuffleDeck();
  }

  updateNumOfPlayers = (e) => {
    this.setState({ error: false, errorMsg: null, optionsSubmitted: false});
    const _numOfPlayers = +e.target.value;
    this.setState({ _numOfPlayers });
    this.validateForm(_numOfPlayers, this.state._numOfCards);
  }

  updateNumOfCards = (e) => {
    this.setState({ error: false, errorMsg: null, optionsSubmitted: false});
    const { _numOfPlayers } = this.state;
    const _numOfCards = +e.target.value;
    this.setState({ _numOfCards });
    this.validateForm(_numOfPlayers, _numOfCards);
  }

  validateForm = (numOfPlayers, numOfCards) => {
    const maxCardsAvailable = Math.floor(52 / numOfPlayers);
    if (numOfPlayers > 26) {
      this.setState({ error: true, errorMsg: 'Maximum Amount of players is 26'});
    } else if (numOfPlayers < 2) {
      this.setState({ error: true, errorMsg: 'Minimum Amount of players is 2'});
    }
    if (numOfCards > 52) {
      this.setState({ error: true, errorMsg: 'Maximum Amount of cards available is is 52'});
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
      this.props.chooseNumOfCards({ numOfCards });
      this.props.chooseNumOfPlayers({ numOfPlayers });
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
            <input type="number" id="choose-players-input" onChange={this.updateNumOfPlayers} min="2" max="26"/>
          </div>
          <div className={gameOptionsFormCards}>
            <label htmlFor="choose-cards-input">Choose Number Of Cards To Be Dealt</label>
            <input type="number" id="choose-cards-input" onChange={this.updateNumOfCards} min="1" max="52"/>
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
