import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../redux/action-creators/index';
import { Link } from 'react-router-dom';
import history from '../../misc/history';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { alertMessages } from '../../misc/alertMessages';
import Logo from '../../img/logo.png';

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  loginLink : {
    textDecoration: 'none'
  },
  wrapper: {
    backgroundColor: 'white',
    padding: '15px'
  }
}));

const SignupPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(state => state.userState.user);

  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const [inputErrorText, setInputErrorText] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');

  useEffect(() => {
    if (user) history.push('/');
  }, []);

  const resetInputErrors = () => {
    setInputErrorText('');
    setPasswordsMatch(true);
  }

  const setPasswordsNoMatchError = () => {
    setInputErrorText(alertMessages.PASSWORDS_NO_MATCH.message);
    setPasswordsMatch(false);
  }
  
  const handleSubmit = event => {
    event.preventDefault();

    resetInputErrors();

    if (password !== cpassword){
      return setPasswordsNoMatchError();
    }

    if (username && password) {
      dispatch(userActions.signup({username, password, role: 'user'}));
    }
  }

  return (
    <Container component="main" maxWidth="xs" className={classes.wrapper}>
      <div className={classes.paper}>
        <div >
          <img src={Logo} className={classes.avatar} />
        </div>
        <Typography component="h1" variant="h5">
          Registrer
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Brukernavn"
                name="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!passwordsMatch}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Passord"
                type="password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!passwordsMatch}
                variant="outlined"
                required
                fullWidth
                name="cpassword"
                label="Bekreft Passord"
                type="password"
                id="cpassword"
                value={cpassword}
                onChange={e => setCPassword(e.target.value)}
                helperText={!passwordsMatch ? inputErrorText : ''}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Registrer
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to='/login' className={classes.loginLink}>
                {'Har du allerede en konto? Logg inn'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default SignupPage;