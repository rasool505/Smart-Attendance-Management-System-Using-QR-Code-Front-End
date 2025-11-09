import { Route, Routes } from 'react-router-dom';
import Login from './Auth/Login.jsx';
import QrReader from './Pages/QrReader.jsx';
import Instructor from './Pages/Instructor.jsx';
import QrView from './Pages/QrView.jsx';

function App() {

  return (
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/student' element={<QrReader/>}/>
      <Route path='/instructor' element={<Instructor/>}/>
      <Route path='/qr-view' element={<QrView/>}/>
    </Routes>
  )
}

export default App
