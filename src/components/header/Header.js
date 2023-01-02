import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logout } from "../../store/actions";

const Header = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem("loggedInUser");
        
        dispatch(logout());
        return navigate("/");
    }

    return (
        <NavLink className='my-account__signout' to="/" onClick={handleLogout} >Logout</NavLink>
    )
}

export default Header;