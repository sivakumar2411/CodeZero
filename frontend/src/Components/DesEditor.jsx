import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const DesEditor = () => {
  const [editorData, setEditorData] = useState('');

  return (
    <div style={{width:'100%',height:"100vh"}}>
      <CKEditor
        editor={ClassicEditor}
        data={editorData}
        onChange={(event, editor) => {
          const data = editor.getData();
          setEditorData(data);
        }}
        config={{
          toolbar: [
            'heading', '|',
            'bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', '|',
            'link', 'bulletedList', 'numberedList', 'blockQuote', '|',
            'insertTable', 'tableColumn', 'tableRow', 'mergeTableCells', '|',
            'imageUpload', 'mediaEmbed', '|',
            'alignment', 'outdent', 'indent', '|',
            'fontFamily', 'fontSize', 'fontColor', 'fontBackgroundColor', '|',
            'specialCharacters', 'highlight', '|',
            'undo', 'redo', 'removeFormat', '|',
            'code', 'codeBlock', 'sourceEditing', '|',
            'horizontalLine', 'pageBreak'
          ],
          language: 'en',
        }}

        style={{width:"100%",height:"100%",overflowY:"auto"}}
      />
    </div>
  );
};

export default DesEditor;
