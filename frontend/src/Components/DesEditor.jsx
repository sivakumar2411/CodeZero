import React, { useRef } from 'react';
import { createReactEditorJS } from 'react-editor-js';

const DesEditor = () => {

    const Ins = createReactEditorJS();
    const editorInstance = useRef(null);

  return (
    <div style={{width:"100%",height:'100vh'}}>
        <Ins
            instanceRef={(instance) => (editorInstance.current = instance)}
            tools={{}}
            style={{width:'100%',height:'100vh'}}
        />
    </div>
  )
}

export default DesEditor