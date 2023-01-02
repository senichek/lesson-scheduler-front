import { Route, Routes } from 'react-router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './store/actions';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AdminDashBoard from './components/adminDashBoard/AdminDashBoard';
import Login from './components/login/Login';
import Header from './components/header/Header';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  
     // If there is a logged-in user in the localStorage, we will put it to our State.
        if (loggedInUser) {
          dispatch(setUser(loggedInUser));
      }
  })
  
  return (
    <>
      <Header /> 
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/admindashboard' element={<AdminDashBoard />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
