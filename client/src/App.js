
import './App.css';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import { Route, Routes} from 'react-router-dom'

function App() {
  return (
   <>
   <Header></Header>
   <Routes>
    <Route path='/signup' element={<Signup></Signup>}></Route>
    <Route path='/login' element={<Login></Login>}></Route>
    <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
   </Routes>
   </>
  );
}

export default App;
