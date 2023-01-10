import { Route, Routes, useLocation } from 'react-router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './store/actions';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AdminDashBoard from './components/adminDashBoard/AdminDashBoard';
import Login from './components/login/Login';
import Header from './components/header/Header';
import UserDashBoard from './components/userDashBoard/UserDashBoard';
import LessonDetailsCard from './components/lessonDetailsCard/LessonDetailsCard';

function App() {

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  
     // If there is a logged-in user in the localStorage, we will put it to our State.
        if (loggedInUser) {
          dispatch(setUser(loggedInUser));
      }
  })
  
  return (
    <>
      {location.pathname !== "/" &&
        <Header />
      } 
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/admindashboard' element={<AdminDashBoard />} />
        <Route path='/userdashboard' element={<UserDashBoard />} />
        <Route path='/lessoninfo/:lessonId' element={<LessonDetailsCard />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
