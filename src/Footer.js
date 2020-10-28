import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import GitHubIcon from '@material-ui/icons/GitHub';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles({
  footer: {
  backgroundColor: 'lightgrey',
  width: '100%',
  padding: '3rem',
  bottom: 0
}
});


function Footer() {
  const classes = useStyles();

  return(
    <footer className={classes.footer}>
        <Box textAlign="center">
          <p>
            Powered with <FavoriteIcon style={{ color: red[800] }} /> by Feka. See my project on
            <a style={{color: 'black'}}href="https://github.com/Feka7/library"> <GitHubIcon /></a>
            </p>
        </Box>
      </footer>
  );
}
export default Footer;
