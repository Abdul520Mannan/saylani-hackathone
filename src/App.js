import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import SplashScreen from './pages/SplashScreen';
import ForgetPassword from './pages/login/ForgetPassword';
import UserHome from './pages/user/Home';
import Cart from './pages/user/Cart';
import UserAccount from './pages/user/UserAccount';
import Login from './pages/login/Login';
import Signup from './pages/login/Signup';
// import AdminHome from './pages/admin/Home';
import Product from './pages/admin/Product';
import Setting from './pages/admin/Setting';
import Index from './pages/admin';

function App() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<SplashScreen />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/forget-password' element={<ForgetPassword />} />
        <Route exact path='/user/home' element={<UserHome />} />
        <Route exact path='/user/cart' element={<Cart />} />
        <Route exact path='/user/setting' element={<UserAccount />} />
        <Route exact path='/admin/home' element={<Index />} />
        <Route exact path='/admin/product' element={<Index />} />
        <Route exact path='/admin/setting' element={<Index />} />
        <Route exact path='/admin/orders' element={<Index />} />
      </Routes>
    </>
  );
}

export default App;
