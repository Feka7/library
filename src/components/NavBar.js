import React from 'react'
import {Link} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  titleBar: {
    color: 'white',
  },
  titleMenu: {
    color: 'black'
  },
 responsive: {
  width: '100%',
  height: 'auto',
  maxWidth: '200px'
}
});

const useStylesTheme = makeStyles((theme) => ({
  logo: {
    textAlign: "left"
  },
}));


function NavBar() {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();
  const classesTheme = useStylesTheme();
  return (

    <AppBar position="static">
      <Toolbar>
      <Box display={{ xs: 'block', md: 'none' }}>
      <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleClick}>
            <MenuIcon />
      </IconButton>
      <Drawer
            variant="temporary"
            anchor="left"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            keepMounted
            onClose={handleClose}
          >
          <List>
              <ListItem style={{fontWeight: 'bold'}}>
                Menù
              </ListItem>
              <Divider />
              <ListItem>
                <Link to="/Home" className={classes.titleMenu} onClick={handleClose}>
                 Home
                </Link>
              </ListItem>
              <ListItem>
                <Link to="/Latest" className={classes.titleMenu} onClick={handleClose}>
                 Latest
                </Link>
              </ListItem>
            </List>
      </Drawer>
      </Box>
        <Box p={1} className={classesTheme.logo}>
          <img src="https://bulma.io/images/bulma-logo.png" className={classes.responsive}/>
        </Box>
        <Box width="60%" style={{textAlign: 'center'}} display={{ xs: 'none', md: 'block'}}>
        <Box display="flex" justifyContent="center">
        <Box p={1}>
              <Typography variant="body1">
                <Link to="/Home" className={classes.titleBar}>
                 HOME
                </Link>
              </Typography>
          </Box>
          <Box p={1}>
              <Typography variant="body1">
                    <Link to="/Latest" className={classes.titleBar}>
                     ULTIMI ARRIVI
                    </Link>
              </Typography>
          </Box>
      <Box p={1}>
      <Typography variant="body1">
        <Link to="/Best" className={classes.titleBar}>
         PREFERITI
        </Link>
      </Typography>
      </Box>
      <Box p={1}>
      <Typography variant="body1" >
         LISTA DESIDERI
      </Typography>
      </Box>
      </Box>
      </Box>
      </Toolbar>
    </AppBar>


  );
}

export default NavBar;
