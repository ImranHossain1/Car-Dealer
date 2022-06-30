import logo from './logo.svg';
import './App.css';
import Navbar from './Pages/Shared/Navbar';
import Footer from './Pages/Shared/Footer';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';

import Shop from './Pages/Shop/Shop';
import RequireAuth from './Pages/Login/RequireAuth';
import Dashboard from './Pages/Dashboard/Dashboard';
import Register from './Pages/Login/Register';
import Dashboard2 from './Pages/Dashboard/Dashboard2';
import Users from './Pages/Dashboard/Users';
import Profile from './Pages/Dashboard/Profile';



function App() {
  return (
        <>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/registration' element={<Register/>}/>
            <Route path='/shop' element={<RequireAuth><Shop/></RequireAuth>}/>
            <Route path='dashboard' element={<RequireAuth><Dashboard/></RequireAuth>}>
              <Route index element={<Profile></Profile>}></Route>
              <Route path='users' element={<Users></Users>}></Route>
            </Route>
          </Routes>
          <Footer></Footer>
        </>
  );
}

export default App;
