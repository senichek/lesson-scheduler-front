import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../store/actions";

const NavLinks = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const role = useSelector((state) => state.user.role);

    const handleLogout = () => {
        localStorage.removeItem("loggedInUser");
        
        dispatch(logout());
        return navigate("/");
    }

    return (
    <div className="header__navlinks">
        <NavLink className='header__about nav' to="/about" >About</NavLink>
        {role === "ADMIN" &&
            <NavLink className='header__dashboard nav' to="/admindashboard" >Dashboard</NavLink>
        }
        {role === "USER" &&
            <NavLink className='header__dashboard nav' to="/userdashboard" >Dashboard</NavLink>
        }
        <NavLink className='header__profile nav' to="/profile" >Profile</NavLink>
        <NavLink className='header__logout nav' to="/" onClick={handleLogout} >Logout</NavLink>
    </div>
    )
}

export default NavLinks;