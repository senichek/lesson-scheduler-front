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
import SignUp from './components/signUp/SignUp';
import About from './components/about/About';
import Profile from './components/profile/Profile';

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

  const noHeaderRoutes = [
    '/',
    '/signup',
  ]
  
  return (
    <>
      {noHeaderRoutes.indexOf(location.pathname) < 0 && <Header/>}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/admindashboard' element={<AdminDashBoard />} />
        <Route path='/userdashboard' element={<UserDashBoard />} />
        <Route path='/lessoninfo/:lessonId' element={<LessonDetailsCard />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/about' element={<About />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
