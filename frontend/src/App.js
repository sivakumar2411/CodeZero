import './App.css';
import {Route, Routes} from 'react-router-dom';
import Home from './Components/Home';
import Problems from './Components/Problems';
import Friends from './Components/Friends';
import OpenIDE from './Components/OpenIDE';
import ToasterFunc from './Components/ToasterFunc';
import PageNotFound from './Components/PageNotFound';
import { useContext } from 'react';
import { UserContext } from './Components/GlobeData';
import Sign from './Components/Sign';

function App() {

  const {LoggedIn} = useContext(UserContext);

  return (
    <>
    <ToasterFunc/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Home' element={<Home/>}/>
      <Route path='/Problems' element={<Problems/>}/>
      <Route path='/Friends' element={<Friends/>}/>
      <Route path='/IDE' element={<OpenIDE/>}/>
      <Route path='/Sign' element={<Sign/>}/>
      <Route path='/*' element={<PageNotFound/>}/>
    </Routes>
    </>
  );
}

export default App;
