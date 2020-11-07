import React, { Component }  from 'react';
import {Link} from 'react-router-dom'
import {Button, TextField, Grid, Container, Typography, Box, Divider, Paper, ButtonGroup} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios';
import Best from './Best'
import NoMatch from './NoMatch'

/*
*la classe rappresenta l'elenco dei libri dopo aver effettuato una ricerca
*/

class Library extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      api_key: "AIzaSyB_QCE1mKDbbtRTXsLmeZvsOHN0ozURJqA",
      no_image: "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg",
      words: this.props.word,
      orderBy: this.props.order
    };
    this.GetLibrary = this.GetLibrary.bind(this);
    this.Search = this.Search.bind(this);
  }

  GetLibrary() {
       axios.get("https://www.googleapis.com/books/v1/volumes?q="+this.state.words+"&max_results=40&orderBy="+this.state.orderBy+"&projection=full&key="+this.state.api_key+"")
      .then(res => res.data)
      .then(
        (result) => {

          if(result.totalItems > 0){
            result.items = result.items.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i);
            this.setState({
              isLoaded: true,
              items: result.items,
              words: ""
            });
          } else {
          this.setState({
            isLoaded: true,
            items: [],
            words: ""
          });
        }
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  componentDidMount() {
    this.GetLibrary();
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  Search(e) {
    e.preventDefault()
    this.setState({
        words: e.target.value,
        orderBy: "relevance"
      }
    )
  }

  render() {

  const { error, isLoaded, items} = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div style={{padding: "15rem"}}> <CircularProgress /></div>;
    } else if (items.length == 0) {
      return <div style={{padding: "15rem"}}> <NoMatch /></div>;
    }
     else {
      return (
          <Container>
          <Box p={6}>
          <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
              <Grid item xs={10} sm={6}>
                <Typography variant="h4">Inserisci una parola chiave
                 e trova qualsiasi libro tu desideri!</Typography>
              </Grid>
              <Grid item xs={12}>
                   <TextField
                      id="standard-basic"
                      label="Write here!"
                      value={this.state.words}
                      onChange={this.Search}
                   />
                </Grid>
                <Grid item xs={12}>
                   <Button
                     variant="contained"
                     color="primary"
                     className="inputButton"
                     endIcon={<SearchIcon />}
                     onClick={this.GetLibrary}
                   >
                       Search
                   </Button>
                </Grid>
              <Box p={6} />
              <Grid container direction="row" justify="flex-start" spacing={6}>
              {items.map(item => (
              <Grid item key={item.id} sm={4} xs={12}>
                <Paper elevation={3} style={{backgroundColor: "#F5F5F5"}}>
                  <Box minHeight="380px" py={4} px={1}>
                      <img src={'imageLinks' in item.volumeInfo ?
                       item.volumeInfo.imageLinks.smallThumbnail :
                       this.state.no_image} alt="item.volumeInfo.title" style={{maxWidth:"50%"}}/>
                    <Box pt={2} />
                    <Typography variant="h6">{item.volumeInfo.title}</Typography>
                    <Typography variant="body2" noWrap>{item.volumeInfo.authors + " "}</Typography>
                    <Box pt={2}>
                    <ButtonGroup variant="text" fullWidth="true" aria-label="text primary button group">
                        <Button>
                        <Link to={{
                            pathname: `/Books/${item.id}`,
                            state: {
                              item: item
                            }
                          }} style={{color: 'black'}}>
                          <Tooltip title="Approfondisci">
                            <MenuBookIcon />
                          </Tooltip>
                          </Link>
                        </Button>
                        <Button>
                          <Best id={item} />
                        </Button>
                        <Button disabled>
                          <Tooltip title="Aggiungi alla lista desideri">
                            <ShoppingCartIcon />
                          </Tooltip>
                        </Button>
                      </ButtonGroup>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
              ))}
            </Grid>
          </Grid>
        </Box>
        </Container>
      );
    }
  }
}

export default Library;
