import React from 'react';
import './App.css';
import Library from './components/Library'
import NavBar from './components/NavBar'
import Book from './components/Book'
import NoMatch from './components/NoMatch'
import Footer from './components/Footer'
import ListBest from './components/ListBest'
import {Route, Switch, Redirect} from 'react-router-dom'
import MyProvider from './components/Provider'


function App() {
  return (
    <MyProvider>
    <div className="App">
      <NavBar />
      <Switch>
        <Route
          exact path="/Home"
          component={() => (
              <Library order={'relevance'} word={'react'}/>
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
        <Route
          exact path="/Best"
          component={() => (
              <ListBest />
            )}
        />
      <Route path="/Books/:id" component={Book} />
      <Route component={NoMatch} />
      </Switch>
      <Footer/>
    </div>
    </MyProvider>
  );
}

export default App;
