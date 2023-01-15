import { Route, Routes, useLocation, useNavigate } from 'react-router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, logout } from './store/actions';
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
import { SESSION_DURATION } from './constants';

function App() {

  const dispatch = useDispatch();
  const location = useLocation();
  let navigate = useNavigate();

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  useEffect(() => {
     // If there is a logged-in user in the localStorage, we will put it to our State.
        if (loggedInUser) {
          dispatch(setUser(loggedInUser));
      }
  })

  useEffect(() => {
    //This hook will run every time a user changes the location (route)
    // on the website. Here we check if the login session has expired by
    //simply tracking the time bwteen the jwt token creation and the current time.
    // It must not exceed the value specified in "Constants";
    if (loggedInUser) {
        const sessionStart = new Date(loggedInUser.connectedAt);
        const sessionEnd = new Date();

        const currentSessionLength = sessionEnd - sessionStart;
        if (currentSessionLength > SESSION_DURATION) {
            // Logout
            localStorage.removeItem("loggedInUser");
            dispatch(logout());
            return navigate("/");
        }
    }
}, [location]);

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
