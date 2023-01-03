import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../store/actions";
import './style.scss';

const Header = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const role = useSelector((state) => state.user.role);

    const handleLogout = () => {
        localStorage.removeItem("loggedInUser");
        
        dispatch(logout());
        return navigate("/");
    }

    return (
        <div className="header_container">
            <div className="header__logo">Lessons Booking</div>
            <div className="header__navlinks">
                <NavLink className='header__about nav' to="/about" >About</NavLink>
                {role === "[ROLE_ADMIN]" &&
                    <NavLink className='header__dashboard nav' to="/admindashboard" >Dashboard</NavLink>
                }
                {role === "[ROLE_USER]" &&
                    <NavLink className='header__dashboard nav' to="/userdashboard" >Dashboard</NavLink>
                }
                <NavLink className='header__profile nav' to="/profile" >Profile</NavLink>
                <NavLink className='header__logout nav' to="/" onClick={handleLogout} >Logout</NavLink>
            </div>
        </div>
    )
}

export default Header;