import React, { useEffect, useState } from 'react';
// import Editor from 'draft-js-plugins-editor';
import { EditorState, convertToRaw } from 'draft-js';
import { makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { postActions } from '../../redux/action-creators/post';
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const useStyles = makeStyles(() => ({
  editorContent: {
    userSelect: 'text',
    backgroundColor: 'white',
    height: '200px',
    whiteSpace: 'pre-wrap',
    overflow: 'auto',
    padding: '0 .5em',
    overflowWrap: 'break-word'
  },
  editorToolbar: {
    padding: '6px 5px 0',
    borderRadius: '2px',
    border: '1px solid #F1F1F1',
    display: 'flex',
    justifyContent: 'flex-start',
    background: 'white',
    flexWrap: 'wrap',
    fontSize: '15px',
  }
}));

const TextEditor = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const initialEditorState = EditorState.createEmpty();
  const [editorState, setEditorState] = useState(initialEditorState);

  useEffect(() => {
    document.getElementsByClassName('public-DraftEditor-content')[0].className = classes.editorContent;
    document.getElementsByClassName('rdw-editor-toolbar')[0].className = classes.editorToolbar;
  }, []);

  const handleChange = editorState => {
    setEditorState(editorState);
    const content = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    dispatch(postActions.updatePostHtml(content));
  };

  const toolbarOptions = {
    options: ['inline', 'blockType', 'emoji'],
    inline: { options: ['bold', 'italic', 'underline'] }
  };

  return (
    <div>
      <Editor 
        defaultEditorState={initialEditorState}
        editorState={editorState}
        onEditorStateChange={handleChange}
        toolbar={toolbarOptions}
      />
    </div>
  )
}

export default TextEditor;