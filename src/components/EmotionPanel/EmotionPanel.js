import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import HappyFace from '../../img/happy.png';
import AverageFace from '../../img/average.png';
import SadFace from '../../img/sad.png';

const useStyles = makeStyles(theme => ({
  wrapper: {
    minHeight: '20vh'
  },
  question: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  face: {
    margin: '13px',
    opacity: '0.6',
    '&:hover': {
      opacity: '1',
      cursor: 'pointer'
    }
  },
  facesPanel: {
    paddingTop: '9%'
  },
  selected: {
    margin: '13px',
    opacity: '1',
    '&:hover': {
      cursor: 'pointer'
    }
  }
}));

const EmotionPanel = props => {
  const classes = useStyles();

  const resetClasses = () => {
    document.getElementById('happy').className = classes.face;
    document.getElementById('average').className = classes.face;
    document.getElementById('sad').className = classes.face;
  }

  const handleFaceClicked = id => {
    props.onFaceClicked(id);
    resetClasses();
    document.getElementById(id).className = classes.selected;
  }

  return (
    <div className={classes.wrapper}>
      <Typography variant="h4" className={classes.question}>
        Hvordan var dagen din?
      </Typography>
        <div className={classes.facesPanel}>
          <span id="happy" className={classes.selected} onClick={() => handleFaceClicked('happy')}>
            <img src={HappyFace} />
          </span>
          <span id="average" className={classes.face} onClick={() => handleFaceClicked('average')}>
            <img src={AverageFace} />
          </span>
          <span id="sad" className={classes.face} onClick={() => handleFaceClicked('sad')}>
            <img src={SadFace} />
          </span>
        </div>
    </div>    
  )
}

export default EmotionPanel;