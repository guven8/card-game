import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Header from './Header';
import PokerTable from './PokerTable';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Header/>
          <PokerTable/>
        </div>
      </Provider>
    );
  }
}

export default App;
