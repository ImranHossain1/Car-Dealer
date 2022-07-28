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
import AddViechels from './Pages/Dashboard/AddVehicle';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Vehicles from './Pages/Shop/Vehicles';
import { createTheme, ThemeProvider } from '@mui/material';
import VehicleBooking from './Pages/Shop/VehicleBooking';
import ConfirmVehicle from './Pages/Shop/ConfirmVehicle';
import VehicleList from './Pages/Dashboard/VehicleList';
import RequireAdmin from './Pages/Login/RequireAdmin';
import PurchasedCars from './Pages/Dashboard/PurchasedCars';
import Payment from './Pages/Dashboard/Payment';
import NotFound from './Pages/Shared/NotFound';
import Notifications from './Pages/Dashboard/Notifications';
import Message from './Pages/Dashboard/Message';


const theme = createTheme({
  zIndex: {
    // appBar: 1251,
    // modal: 1250
  }
});
function App() {
  return (
        <>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/registration' element={<Register/>}/>
            <Route path='/vehicles' element={<Vehicles/>}/>
            <Route path='/vehicle/:id' element={<VehicleBooking/>}/>
            <Route path='/confirmVehicle/:id' element={<RequireAuth><ConfirmVehicle/></RequireAuth> }/>
            {/* <Route path='/dashboard2' element={<Dashboard2/>}/> */}
            <Route path='/vehicles/:cons' element={<Vehicles/>}/>
            <Route path='dashboard' element={<RequireAuth><Dashboard/></RequireAuth>}>
              <Route index element={<PurchasedCars></PurchasedCars>}></Route>
              <Route path='payment/:id' element={<Payment></Payment>}></Route>
              <Route path='users' element={<RequireAdmin><Users></Users></RequireAdmin>}></Route>
              <Route path='addvhicle' element={<RequireAdmin><AddViechels></AddViechels></RequireAdmin>}></Route>
              <Route path='vehicleList' element={<RequireAdmin><VehicleList></VehicleList></RequireAdmin>}></Route>
              <Route path='notifications' element={<RequireAdmin><Notifications></Notifications></RequireAdmin>}></Route>
              <Route path='notification/:id' element={<RequireAdmin><Message></Message></RequireAdmin>}></Route>
            </Route>
            <Route path='*' element={<NotFound></NotFound>}></Route>
          </Routes>
          </ThemeProvider>
          <Footer></Footer>
          <ToastContainer/>
        </>
  );
}

export default App;
