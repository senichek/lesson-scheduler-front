import { Route, Routes } from 'react-router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './store/actions';
import './App.css';
import AdminDashBoard from './components/adminDashBoard/AdminDashBoard';
import Login from './components/login/Login';

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
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/admindashboard' element={<AdminDashBoard />} />
      </Routes>
    </>
  );
}

export default App;
