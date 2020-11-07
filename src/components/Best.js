import React, { Component } from 'react';
import MyContext from './Context';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {Button, Tooltip} from '@material-ui/core';
class Best extends Component {
  //classe per aggiornare la lista dei preferiti
  render(props) {
    return (
        <MyContext.Consumer>
          {(context) => (
              <Tooltip title="Aggiungi ai preferiti">
                <StarBorderIcon onClick={() => context.add(this.props.id)}/>
              </Tooltip>
          )}
        </MyContext.Consumer>
    )
  }
}

export default Best;
