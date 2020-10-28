import React from 'react';
import './App.css';
import Library from './Library'
import NavBar from './NavBar'
import Book from './Book'
import NoMatch from './NoMatch'
import Footer from './Footer'
import 'react-bulma-components/dist/react-bulma-components.min.css';
import {Route, Switch, Redirect} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route
          exact path="/Home"
          component={() => (
              <Library order={'relevance'} word={'react'} />
            )}
          />
        <Route exact path="/">
          <Redirect to="/Home" />
        </Route>
        <Route
          exact path="/Latest"
          component={() => (
              <Library order={'newest'}/>
            )}
        />
      <Route path="/Books/:id" component={Book} />
      <Route component={NoMatch} />
      </Switch>
      <Footer/>
    </div>
  );
}

export default App;
