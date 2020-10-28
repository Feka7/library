import React from 'react';
import {Link} from 'react-router-dom'
import {Button, TextField, Grid, Container, Typography, Box, Divider, Paper} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import CircularProgress from '@material-ui/core/CircularProgress';
import './Library.css';

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
    console.log(this.state.words)
       fetch("https://www.googleapis.com/books/v1/volumes?filter=paid-ebooks&q="+this.state.words+"&max_results=40&orderBy="+this.state.orderBy+"&projection=full&key="+this.state.api_key+"")
      .then(res => res.json())
      .then(
        (result) => {
          result.items = result.items.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i);
          this.setState({
            isLoaded: true,
            items: result.items,
            words: ""
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
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
    } else {
      return (
          <Container>
          <Box p={6}>
          <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
              <Grid item xs={10} sm={6}>
                <Typography variant="h4">Inserisci un parola chiave
                 e trova qualsiasi libro tu desideri</Typography>
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
                  <Box minHeight="380px" py={6}>
                    <Link to={{
                        pathname: `/Books/${item.id}`,
                        state: {
                          item: item
                        }
                      }}>
                      <img src={'imageLinks' in item.volumeInfo ?
                       item.volumeInfo.imageLinks.smallThumbnail :
                       this.state.no_image} alt="item.volumeInfo.title" style={{maxWidth:"50%"}}/>
                    </Link>
                    <Box py={2} />
                    <Typography variant="h6">{item.volumeInfo.title}</Typography>
                    <Typography variant="body2" noWrap>{item.volumeInfo.authors + " "}</Typography>
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
