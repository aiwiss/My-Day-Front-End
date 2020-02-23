import React, { useState, useEffect } from 'react';
import TextEditor from '../../Elements/RTE/TextEditor';
import { useDispatch, useSelector } from 'react-redux';
import { postActions } from '../../../redux/action-creators/post';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import history from '../../../misc/history';
import { makeStyles } from '@material-ui/core';
import EmotionPanel from '../../Elements/EmotionPanel/EmotionPanel';

const useStyles = makeStyles(theme => ({
  wrapper: {
    width: '600px',
    [theme.breakpoints.down('sm')]: {
      width: '400px'
    }
  }
}))

const AddPostPage = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector(state => state.userState.user);
  const post = useSelector(state => state.postState.post);
  const postHtml = useSelector(state => state.postState.postHtml);
  const [emotion, setEmotion] = useState('happy');

  useEffect(() => {
    if (post) {
      dispatch(postActions.clearPost());
      history.push('/');
    }
  }, [post]);

  const handleFaceClicked = emotionName => {
    setEmotion(emotionName);
  }

  const handleSubmit = isPostPublic => {
    const postData = {
      content: postHtml,
      public: isPostPublic,
      author: user.pseudoname,
      emotion: emotion
    }

    dispatch(postActions.create(postData));
  }

  return (
    <Container component="main" className={classes.wrapper}>
      <form>
        <Grid container alignContent="center" spacing={2}>
          <Grid item xs={12}>
            <EmotionPanel onFaceClicked={handleFaceClicked}/>
          </Grid>
          <Grid item xs={12}>
            <TextEditor />
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth color="primary" variant="contained" onClick={() => handleSubmit(false)}>
              Lagre
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth color="secondary" variant="contained" onClick={() => handleSubmit(true)}>
              Publiser
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default AddPostPage;