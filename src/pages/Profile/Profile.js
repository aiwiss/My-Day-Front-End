import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { userActions } from '../../redux/action-creators/index';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { alertMessages } from '../../misc/alertMessages';
import CircularProgress from '@material-ui/core/CircularProgress';
import { userService } from '../../services/user-service';


const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: '30px',
    marginBottom: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  wrapper: {
    backgroundColor: 'white',
    padding: '15px'
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
    marginTBottom: theme.spacing(3),
    padding: '10px'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  label: {
    marginTop: '15px'
  },
  profileInfoArea: {
    border: `1px solid ${theme.palette.primary.light}`,
    borderRadius: '5px',
    padding: '15px'
  },
  spinner: {
    float: 'right'
  }
}));

const ProfilePage = () => {
  const classes = useStyles();
  const user = useSelector(state => state.userState.user);
  const userAlert = useSelector(state => state.userState.alert);
  const loading = useSelector(state => state.userState.loading);
  
  const dispatch = useDispatch();
  
  const initialState = '';
  const [dirty, setDirty] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [inputErrorText, setInputErrorText] = useState(initialState);

  const [currentPassword, setCurrentPassword] = useState(initialState);
  const [newPassword, setNewPassword] = useState(initialState);
  const [repPassword, setRepPassword] = useState(initialState);

  const resetPasswordFields = () => {
    setCurrentPassword(initialState);
    setNewPassword(initialState);
    setRepPassword(initialState);
  }

  useEffect(() => {
    resetPasswordFields();
  }, [userAlert]);

  useEffect(() => {
    if (loading) setDirty(false)
  }, [loading]);

  const onAlertClose = () => {
    dispatch(userActions.clearAlert());
  }

  const handleChange = event => {
    const sender = event.target.id;
    const value = event.target.value;

    const isDirty = value !== initialState ? true : false;
    setDirty(isDirty);
    
    switch (sender) {
      case 'currentPassword':
        setCurrentPassword(value);
        break;
      case 'newPassword':
        setNewPassword(value);
        break;
      case 'repPassword':
        setRepPassword(value);
        break;
      default:
        return;
    }
  }

  const resetInputErrors = () => {
    setInputErrorText('');
    setPasswordsMatch(true);
    setValidPassword(true);
  }

  const setPasswordsNoMatchError = () => {
    setInputErrorText(alertMessages.PASSWORDS_NO_MATCH.message);
    setDirty(false);
    setPasswordsMatch(false);
  }

  const setPasswordInvalidError = () => {
    setInputErrorText(alertMessages.INVALID_PASSWORD.message);
    setDirty(false);
    setValidPassword(false);
  }

  const handleSubmit = () => {

    resetInputErrors();

    const userData = {
      ...user,
      password: newPassword
    }

    if (dirty && newPassword !== repPassword){
      return setPasswordsNoMatchError();
    }

    userService.validate(user.username, currentPassword)
    .then(result => {
      if (result) dispatch(userActions.update(userData));
    })
    .catch(err => {
      return setPasswordInvalidError();
    });
  }

  return (
    <div>
      <Container component="main" maxWidth="xs" className={classes.wrapper}>
        <Avatar />
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="overline" className={classes.label}>
                Profilinformasjon
              </Typography>                     
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2} className={classes.profileInfoArea}>
                <Grid item xs={6}>
                  <Typography variant="caption" style={{display: 'inline-block'}}>
                    Brukernavn:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" style={{display: 'inline-block'}}>
                    {user.username}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" style={{display: 'inline-block'}}>
                    Anonymt-navn:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" style={{display: 'inline-block'}}>
                    {user.pseudoname}
                  </Typography> 
                </Grid>
              </Grid>
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="overline" className={classes.label}>
                Bytt passord
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container className={classes.profileInfoArea} spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    error={!validPassword}
                    variant="outlined"
                    id="currentPassword"
                    label="Nåværende passord"
                    type="password"
                    value={currentPassword}
                    onChange={handleChange}
                    fullWidth
                    helperText={!validPassword ? inputErrorText : ''}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={!passwordsMatch}
                    variant="outlined"
                    id="newPassword"
                    label="Nytt passord"
                    type="password"
                    value={newPassword}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={!passwordsMatch}
                    variant="outlined"
                    id="repPassword"
                    label="Bekreft Passord"
                    type="password"
                    value={repPassword}
                    onChange={handleChange}
                    fullWidth
                    helperText={!passwordsMatch ? inputErrorText : ''}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!dirty}
            onClick={handleSubmit}
          >
            Lagre
            {loading && <CircularProgress color="secondary" size={20} className={classes.spinner} />}
          </Button>
        </form>
      </Container>
    </div>
  )
}

export default ProfilePage;