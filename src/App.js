import React from 'react';
import logo from './logo.svg';
import './App.css';
import Library from './Library'
import 'react-bulma-components/dist/react-bulma-components.min.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Library />
      </header>
    </div>
  );
}

export default App;
