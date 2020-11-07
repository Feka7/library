import React, { Component } from 'react';
import MyContext from './Context';

class MyProvider extends Component {

  /*
  *la classe contiene l'elenco dei libri inseriti tra i preferiti
  */

  constructor(props) {
    super(props);
    this.state = { best: []};
  }

  render() {
    return (
      <MyContext.Provider value={{
        state: this.state,
        add: x => {
          let found = false;
          this.state.best.forEach(function(value, index, arr){ if(x.id==value.id) found=true;})
          if(!found) {
            this.setState({
              best: this.state.best.concat(x)
            })
          }
        },
        remove: x => {
            this.setState({
              best: this.state.best.filter(function(value, index, arr){ return x.id != value.id;})
            })
        }
    }}>
        {this.props.children}
      </MyContext.Provider>
    )
  }
}

export default MyProvider;
