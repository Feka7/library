import React from 'react';
import {Button, TextField, Grid, Container, Typography, Box, Divider} from '@material-ui/core'

class Book extends React.Component {

  constructor(props) {
    super(props);
    this.state = {item: this.props.location.state.item};
  }

  render() {
  const { item } = this.state;
  return (
  <Container>
    <Box p={6}>
      <Grid container direction="row" justify="center" spacing={3}>
        <Grid item xs={12} sm={8}>
          <Typography variant="h4">{item.volumeInfo.title}</Typography>
          <Box>
           <img src={'imageLinks' in item.volumeInfo ?
            item.volumeInfo.imageLinks.thumbnail :
            item.no_image} alt="item.volumeInfo.title"/>
          </Box>
          <Box textAlign="left">
          <Typography variant="subtitle" display="block">{item.volumeInfo.authors + " "}</Typography>
          <Typography variant="overline" display="block">{item.volumeInfo.publishedDate}</Typography>
          <p>Pubblicato da: {item.volumeInfo.publisher}</p>
          <p>Il libro <b>{item.saleInfo.isEbook ? '' : 'non'}  è</b> disponibile nel formato ebook.</p>
          <a href={item.saleInfo.buyLink}>
          <button className="button is-danger is-rounded">Buy</button>
          </a>
          <Typography variant="body1">Introduzione: {item.volumeInfo.description}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  </Container>
  );
  }
}

export default Book;
