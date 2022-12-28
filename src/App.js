import { Route, Routes } from 'react-router';
import './App.css';
import AdminDashBoard from './components/adminDashBoard/AdminDashBoard';
import Login from './components/login/Login';

function App() {
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
