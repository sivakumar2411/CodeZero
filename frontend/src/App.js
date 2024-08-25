import './App.css';
import {Route, Routes} from 'react-router-dom';
import Home from './Components/Home';
import Problems from './Components/Problems';
import Friends from './Components/Friends';
import OpenIDE from './Components/OpenIDE';
// import ToasterFunc from './Components/ToasterFunc';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Home' element={<Home/>}/>
      <Route path='/Problems' element={<Problems/>}/>
      <Route path='/Friends' element={<Friends/>}/>
      <Route path='/IDE' element={<OpenIDE/>}/>
    </Routes>
    </>
  );
}

export default App;
