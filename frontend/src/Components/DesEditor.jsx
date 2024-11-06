import React, { useContext, useState } from 'react';
import { ThemeContext } from './GlobeData';
import '../Assets/Css/IDE.css';
import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


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
            'alignment', 'outdent', 'indent', '|',
            'insertTable', 'tableColumn', 'tableRow', 'mergeTableCells', '|',
            'imageUpload', 'mediaEmbed', '|',
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