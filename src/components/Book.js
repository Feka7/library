import React from 'react';
import {Button, TextField, Grid, Container, Typography, Box, Divider} from '@material-ui/core'

/*
*la classe rappresenta un singolo libro
*/

class Book extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      item: this.props.location.state.item,
      no_image: "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
}

  render() {
  const { item } = this.state;
  return (
  <Container>
    <Box p={6}>
      <Grid container direction="row" justify="center" spacing={1}>
        <Grid item xs={12} sm={2}>
          <Box textAlign="center">
           <img src={'imageLinks' in item.volumeInfo ?
            item.volumeInfo.imageLinks.thumbnail :
            this.state.no_image} alt="item.volumeInfo.title" width="200px"/>
          </Box>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Box>
            <Typography variant="h4">{item.volumeInfo.title}</Typography>
            <Typography variant="subtitle" display="block">{item.volumeInfo.authors + " "}</Typography>
          </Box>
        </Grid>
      </Grid>
      <Box p={4} />
      <Grid container direction="row" spacing={1} justify="center">
        <Grid item xs={12} sm={3}>
          <p><b>Data di uscita:</b>  {item.volumeInfo.publishedDate}</p>
        </Grid>
        <Grid item xs={12} sm={3}>
          <p><b>Pubblicato da:</b>  {item.volumeInfo.publisher}</p>
        </Grid>
      </Grid>
      <Grid container direction="row" spacing={1} justify="center">
        <Grid item xs={12} sm={3}>
          <p>Il libro <b>{item.saleInfo.isEbook ? '' : 'non'}  è</b> disponibile nel formato ebook.</p>
        </Grid>
        <Grid item xs={12} sm={3}>
          <p><b>Numero di pagine:</b> {item.volumeInfo.pageCount}</p>
        </Grid>
        <Grid item xs={12} sm={7}>
          <p style={{textAlign: "left"}}><b>Introduzione:</b> {item.volumeInfo.description}</p>
        </Grid>
      </Grid>
    </Box>
  </Container>
  );
  }
}

export default Book;
