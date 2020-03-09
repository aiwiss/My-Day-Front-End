import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../redux/action-creators/index';
import { Link } from 'react-router-dom';
import history from '../../misc/history';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Logo from '../../img/logo.png';
import { alertMessages } from '../../misc/alertMessages';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: '30px',
    marginBottom: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    width: '150px',
    height: '150px'
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  signupLink : {
    textDecoration: 'none'
  },
  wrapper: {
    backgroundColor: 'white',
    padding: '15px'
  }
}));

const LoginPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(state => state.userState.user);
  const userAlert = useSelector(state => state.userState.alert);

  const [validCreds, setValidCreds] = useState(true);
  const [inputErrorText, setInputErrorText] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (userAlert) setInvalidCredentialsError();
    else dispatch(userActions.clearAlert());
  }, [userAlert]);

  useEffect(() => {
    if (user) history.push('/');
  }, []);

  const setInvalidCredentialsError = () => {
    setInputErrorText(alertMessages.INVALID_CREDENTIALS.message);
    setValidCreds(false);
  }

  const handleSubmit = event => {
    event.preventDefault();
  
    if (username && password) {
      dispatch(userActions.login(username, password));
    }
  }

  return (
    <Container component="main" maxWidth="xs" className={classes.wrapper}>
      <CssBaseline />
      <div className={classes.paper}>
        <div >
          <img src={Logo} className={classes.avatar} />
        </div>
        <Typography component="h1" variant="h5">
          Logg inn
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            error={!validCreds}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Brukernavn"
            name="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoFocus
          />
          <TextField
            error={!validCreds}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Passord"
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            helperText={!validCreds ? inputErrorText : ''}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Logg inn
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to='/signup' className={classes.signupLink}>
                {"Har ikke en konto? Registrer"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default LoginPage;