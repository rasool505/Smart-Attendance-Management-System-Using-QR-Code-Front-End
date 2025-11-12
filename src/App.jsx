import { Route, Routes } from 'react-router-dom';
import Login from './Auth/Login.jsx';
import QrReader from './Pages/QrReader.jsx';
import Instructor from './Pages/Instructor.jsx';
import QrView from './Pages/QrView.jsx';
import AuthRequird from './Auth/AuthRequird.jsx';
import Error404 from './Components/atom/Error404.jsx';
import Error403 from './Components/atom/Error403.jsx';
import Admin from './Pages/Admin.jsx';
import Users from './Pages/Users.jsx';

function App() {

  return (
    <Routes>
      <Route path='*' element={<Error404/>}/>
      <Route path='/403' element={<Error403/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route element={<AuthRequird allowedRole={[0]}/>}>
      <Route path='/admin' element={<Admin/>}>
        <Route path='users' element={<Users/>}/>
      </Route>
      </Route>
      <Route element={<AuthRequird allowedRole={[0,1]}/>}>
      <Route path='/student' element={<QrReader/>}/>
      </Route>
      <Route element={<AuthRequird allowedRole={[0,2]}/>}>
      <Route path='/instructor' element={<Instructor/>}/>
      <Route path='/qr-view' element={<QrView/>}/>
      </Route>
    </Routes>
  )
}

export default App
