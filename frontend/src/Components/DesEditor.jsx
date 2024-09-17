import React, { useContext, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ThemeContext } from './GlobeData';
import '../Assets/Css/IDE.css';

const DesEditor = ({props}) => {
  const {Theme} = useContext(ThemeContext);
  const {val,setval} = props;

  return (
    <div className={`DesEditorMainDiv`} style={{width:'100%',height:"100%",color:"black",overflowY:"auto"}}>
      <CKEditor 
        editor={ClassicEditor}
        data={val}
        onChange={(event, editor) => {
          const data = editor.getData();
          setval(data);
        }}
        config={{
          toolbar: [
            'undo', 'redo', 'removeFormat', '|',
            'heading', '|',
            'bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', '|',
            'link', 'bulletedList', 'numberedList', 'blockQuote', '|',
            'insertTable', 'tableColumn', 'tableRow', 'mergeTableCells', '|',
            'imageUpload', 'mediaEmbed', '|',
            'alignment', 'outdent', 'indent', '|',
            'fontFamily', 'fontSize', 'fontColor', 'fontBackgroundColor', '|',
            'specialCharacters', 'highlight', '|',
            'code', 'codeBlock', 'sourceEditing', '|',
            'horizontalLine', 'pageBreak'
          ],
          language: 'en',
        }}
      />
    </div>
  );
};

export default DesEditor;
