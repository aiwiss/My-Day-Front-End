import React, { useEffect } from 'react';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

import FroalaEditorComponent from 'react-froala-wysiwyg';

// TODO: fine-grained list of plugins used instead of importing all
import 'froala-editor/js/plugins.pkgd.min.js';

const TextEditor = props => {

  const config = {
    toolbarButtons: [
      ['bold', 'italic', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'insertImage', 'emoticons']
    ],
    quickInsertTags: [''],
    placeholderText: 'Skriv historien din...',
    charCounterMax: 1500
  }

  return (
    <div>
      <FroalaEditorComponent tag='textarea' model={props.model} onModelChange={props.onModelChange} config={config} />
    </div>
  )
}
export default TextEditor;