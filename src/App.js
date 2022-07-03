import logo from './logo.svg';
import './App.css';
import Navbar from './Pages/Shared/Navbar';
import Footer from './Pages/Shared/Footer';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';

import RequireAuth from './Pages/Login/RequireAuth';
import Dashboard from './Pages/Dashboard/Dashboard';
import Register from './Pages/Login/Register';
import Users from './Pages/Dashboard/Users';
import Profile from './Pages/Dashboard/Profile';
import AddViechels from './Pages/Dashboard/AddVehicle';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Vehicles from './Pages/Shop/Vehicles';
import ConditionalCars from './Pages/Shop/ConditionalCars';

function App() {
  return (
        <>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/registration' element={<Register/>}/>
            <Route path='/vehicles' element={<Vehicles/>}/>
            <Route path='/vehicles/:condition' element={<ConditionalCars/>}/>
            <Route path='dashboard' element={<RequireAuth><Dashboard/></RequireAuth>}>
              <Route index element={<Profile></Profile>}></Route>
              <Route path='users' element={<Users></Users>}></Route>
              <Route path='addvhicle' element={<AddViechels></AddViechels>}></Route>
            </Route>
          </Routes>
          <Footer></Footer>
          <ToastContainer/>
        </>
  );
}

export default App;
