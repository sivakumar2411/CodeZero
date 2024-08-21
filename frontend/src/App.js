import logo from './logo.svg';
import './App.css';
import Editor from '@monaco-editor/react'

function App() {
  return (
    <>
    <Editor height="90vh" defaultLanguage='javascript' defaultValue=''/>
    </>
  );
}

export default App;
