import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Header from './Header';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Header/>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
      </Provider>
    );
  }
}

export default App;
