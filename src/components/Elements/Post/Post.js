import React, { useState } from 'react';
import { postActions } from '../../../redux/action-creators/post';
import getUIDate from '../../../misc/date';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Tooltip from '@material-ui/core/Tooltip';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import DeleteIcon from '@material-ui/icons/Delete';
import PublicIcon from '@material-ui/icons/Public';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import { alertMessages } from '../../../misc/alertMessages';
import HappyFace from '../../../img/happy.png';
import AverageFace from '../../../img/average.png';
import SadFace from '../../../img/sad.png';
import { Typography } from '@material-ui/core';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Editor, EditorState, convertFromRaw} from 'draft-js';

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
  visible: {
    display: 'block'
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

const Post = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(state => state.userState.user);
  const post = props.post;
  const [postContent, setPostContent] = useState(EditorState.createWithContent(convertFromRaw(JSON.parse(post.content)))); 
  let isAlreadyFavorite = post.favoriteOf.indexOf(user.pseudoname) !== -1;
  let isAlreadyPublic = post.public;
  let isAdmin = user.role === 'admin';
  let isOwner = post.author === user.pseudoname;
  let showFavorite = !isOwner;
  let showChat = !isOwner;
  let showDelete = isOwner || isAdmin;
  let showPublic = isOwner;
  const [isFavorite, setIsFavorite] = useState(isAlreadyFavorite);
  const [isPublic, setIsPublic] = useState(isAlreadyPublic);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleChatClick = () => props.onChatClick(post.author);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    props.onFavoriteClick(post)
  };

  const handlePublicClick = () => {
    let updatedPost = {...post};
    updatedPost.public = !isPublic;
    dispatch(postActions.update(updatedPost));
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
          <img src={getEmotion()} className={classes.faceImg} />
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