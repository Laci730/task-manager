import { Routes, Route } from 'react-router-dom'
import '../../styles/App.css'
import Login from '../Login/Login'
import Manager from '../Manager/Manager'
import Signup from '../Signup/Signup';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Manager />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
    </Routes>
  );
}

export default App
