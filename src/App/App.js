import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Image from '../img/background.jpg';
import LoginPage from '../pages/Login/Login';
import SignupPage from '../pages/Signup/Signup';
import AuthRoute from '../routing/AuthRoute/AuthRoute';

const desktopTheme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          background: `url(${Image}) no-repeat`,
          backgroundAttachment: 'fixed'
        }
      }
    }
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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);

  useEffect(() => {
    const resizeHandler = () => setIsMobile(window.innerWidth < 800);
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
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
