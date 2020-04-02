import React, { useState } from 'react';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import { alertMessages } from '../../misc/alertMessages';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import getUIDate from '../../misc/date';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent, CardActions,
  Avatar, IconButton, Tooltip, Typography } from '@material-ui/core';
import { FavoriteIcon, ChatBubbleIcon, DeleteIcon, PublicIcon } from './PostIcons';
import HappyFace from '../../img/happy.png';
import AverageFace from '../../img/average.png';
import SadFace from '../../img/sad.png';

const useStyles = makeStyles(() => ({
  card: {
    width: 600,
    marginTop: '20px',
    marginBottom: '20px'
  },
  heartIcon: {
    '&:hover': {
      color: 'red'
    }
  },
  heartIconSelected: {
    color: 'red'
  },
  messageIcon: {
    '&:hover': {
      color: 'blue'
    }
  },
  publicIcon: {
    '&:hover': {
      color: 'springgreen'
    }
  },
  publicIconSelected: {
    color: 'springgreen'
  },
  binIcon: {
    float: 'right',
    '&:hover': {
      color: 'darkseagreen'
    }
  },
  hidden: {
    display: 'none'
  },
  faceImg: {
    height: '50px',
    width: '50px',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  postContent: {
    wordWrap: 'break-word'
  }
}));

const Post = ({ post, user, ...props }) => {
  const classes = useStyles();
  const postContent = EditorState.createWithContent(convertFromRaw(JSON.parse(post.content)));
  const isAdmin = user.role === 'admin';
  const isOwner = post.author === user.pseudoname;
  const isAlreadyPublic = post.public;
  const isAlreadyFavorite = post.favoriteOf.indexOf(user.pseudoname) !== -1;
  const showPublic = isOwner;
  const showFavorite = !isOwner;
  const showChat = !isOwner;
  const showDelete = isOwner || isAdmin;
  const [isFavorite, setIsFavorite] = useState(isAlreadyFavorite);
  const [isPublic, setIsPublic] = useState(isAlreadyPublic);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleChatClick = () => props.onChatClick(post.author);

  const handleFavoriteClick = () => {
    if (!isAlreadyFavorite) {
      post.favoriteOf.push(user.pseudoname);
    } else {
      const index = post.favoriteOf.indexOf(user.pseudoname);
      post.favoriteOf.splice(index, 1);
    }

    setIsFavorite(!isFavorite);
    props.onFavoriteClick(post);
  };

  const handlePublicClick = () => {
    post.public = !isPublic;
    props.onPublicClick(post);
    setIsPublic(!isPublic);
  }

  const handleDeleteClick = () => {
    setShowConfirmDelete(!showConfirmDelete);
  }

  const handleDeletePost = deleteConfirmed => {
    setShowConfirmDelete(!showConfirmDelete);
    if (!deleteConfirmed) return;

    props.onDeleteClick(post);
  }

  const getEmotion = () => {
    if (post.emotion === 'happy') return HappyFace;
    if (post.emotion === 'average') return AverageFace;
    if (post.emotion === 'sad') return SadFace;
  }

  const getEmotionText = () => {
    if (post.emotion === 'happy') return 'Dagen min var bra!';
    if (post.emotion === 'average') return 'Dagen min var normal.';
    if (post.emotion === 'sad') return 'Dagen min var dårlig...';
  }

  const getFavoriteClass = () => {
    if (!showFavorite) return classes.hidden;
    if (isFavorite) return classes.heartIconSelected;

    return classes.heartIcon;
  }

  const getPublicClass = () => {
    if (!showPublic) return classes.hidden;
    if (isPublic) return classes.publicIconSelected;

    return classes.publicIcon;
  }

  const postActionsPanel = () => {
    const favoriteClass = getFavoriteClass();
    const publicClass = getPublicClass();

    return (
    <CardActions disableSpacing>
      <Tooltip title="Legg til i favoritter">
        <IconButton
          className={favoriteClass}
          onClick={() => handleFavoriteClick()}>
          <FavoriteIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Send melding">
        <IconButton className={showChat ? classes.messageIcon : classes.hidden} onClick={() => handleChatClick()}>
          <ChatBubbleIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Sett historien som offentlig">
        <IconButton
          className={publicClass}
          onClick={() => handlePublicClick()}>
          <PublicIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Fjern historien">
        <IconButton className={showDelete ? classes.binIcon : classes.hidden} onClick={() => handleDeleteClick()}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </CardActions>
  )}

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={<Avatar />}
        title={post.author}
        subheader={getUIDate(post.createdAt)}
      />
      <CardContent>
        <span className={classes.emotionPanel}>
          <Typography variant="h6" style={{ textAlign: 'center' }}>
            {getEmotionText()}
          </Typography>
          <img src={getEmotion()} className={classes.faceImg} alt="emotion"/>
        </span>
        <Editor editorState={postContent} readOnly />
      </CardContent>
      {props.showActions ? postActionsPanel() : null}
      <ConfirmDialog
        open={showConfirmDelete}
        handleDeleteClick={handleDeletePost}
        header={alertMessages.DELETE_POST_CONFIRM.header}
        message={alertMessages.DELETE_POST_CONFIRM.message}
        />
    </Card>
  );
}

export default Post;