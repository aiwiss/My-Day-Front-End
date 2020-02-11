import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import AuthRoute from '../Routing/AuthRoute/AuthRoute';
import indigo from '@material-ui/core/colors/indigo';
import LoginPage from '../Pages/Login/Login';
import SignupPage from '../Pages/Signup/Signup';
import Image from '../../img/background.jpg';


const desktopTheme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          background: `url(${Image}) no-repeat`,
          backgroundAttachment: 'fixed'
        }
      }
    },
  },
  palette: {
    primary: indigo
  }
});

const mobileTheme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundColor: 'white'
        }
      }
    }
  }
});

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  desktopContentContainer: {
    minHeight: '80vh'
  }
}));

const App = () => {
  const classes = useStyles();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = window.innerWidth < 800;
    setIsMobile(mobile);
    
    window.addEventListener('resize', () => {
      setIsMobile(window.innerWidth < 800);
    });
  }, []);

  return (
    <MuiThemeProvider theme={isMobile ? mobileTheme : desktopTheme}>
      <CssBaseline />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        className={isMobile ? '' : classes.desktopContentContainer}>
        <Grid item>
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignupPage} />
            <AuthRoute />
          </Switch>
        </Grid>
      </Grid>
    </MuiThemeProvider>
  );
}

export default App;
