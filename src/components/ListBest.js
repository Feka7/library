import React, { Component } from 'react';
import MyContext from './Context';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {Button} from '@material-ui/core';
class ListBest extends Component {
  /*
  *lista dei libri preferiti
  */
  render(props) {
    return (
        <MyContext.Consumer>
          {(context) => (

                <div style={{minHeight: "500px"}}>
                <h3>Pagina in lavorazione...</h3>
                <h5>I libri verranno comunque mostrati quando aggiunti</h5>
                <p>| | | | |</p>
                <p>v v v v v</p>
                {context.state.best.map(item => (
                <p>{item.volumeInfo.title}
                <Button>
                  <HighlightOffIcon onClick={() => context.remove(item)}/>
                </Button>
                </p>
              ))}
              </div>

          )}
        </MyContext.Consumer>
    )
  }
}

export default ListBest;
