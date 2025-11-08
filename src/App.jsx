import { Route, Routes } from 'react-router-dom';
import Login from './Auth/Login.jsx';
import QrReader from './Pages/QrReader.jsx';
import Instructor from './Pages/Instructor.jsx';

function App() {

  return (
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/student' element={<QrReader/>}/>
      <Route path='/instructor' element={<Instructor/>}/>
    </Routes>
  )
}

export default App
