import { useDispatch, useSelector } from 'react-redux';
import { changeInputValue, login } from '../../store/actions';
import { useNavigate , Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaCaretDown } from "react-icons/fa";
import './style.scss';

const Login = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [showHardcoded, setShowHardcoded] = useState(false);

    // Passing the input name and its value to Store.
    const onInputChange = (event) => {
        dispatch(changeInputValue(event.target.name, event.target.value));
    };

    const email = useSelector((state) => state.user.email);
    const password = useSelector((state) => state.user.password);
    const role = useSelector((state) => state.user.role);
    const isLogged = useSelector((state) => state.user.logged);

    useEffect(() => {
        if (role === 'ADMIN') {
            return navigate('/admindashboard');
        }; 
        if (role === 'USER') {
            return navigate('/userdashboard');
        }
    }, [isLogged]);

    const handleFormSubmit = (event) => {
        event.preventDefault();
        dispatch(login());
    }

    // Hardcoded login as admin
    const loginAsAdmin = () => {
        dispatch(changeInputValue("email", "prof@gmail.com"));
        dispatch(changeInputValue("password", "pass111"));
        dispatch(login());
    }

    // Hardcoded login as user
    const loginAsUser = () => {
        dispatch(changeInputValue("email", "std_one@gmail.com"));
        dispatch(changeInputValue("password", "pass111"));
        dispatch(login());
    }

return(
    <>
    <div className="login__header">Lessons Booking</div>
        <form className="login__form" onSubmit={handleFormSubmit}>
            <div>
                    <input
                        className="login__email_input"
                        type="email"
                        required={true}
                        value={email}
                        onChange={(event) => onInputChange(event)}
                        placeholder="Enter email"
                        name="email"
                    />
            </div>
            <div>
                    <input
                        className="login__password_input"
                        type="password"
                        required={true}
                        value={password}
                        onChange={(event) => onInputChange(event)}
                        placeholder="Enter password"
                        name="password"
                    />
            </div>
            <button className='login__button' type="submit">Login</button>
        </form>
        
        <div className="hardcoded_details__pointer" onClick={() => setShowHardcoded(!showHardcoded)}><FaCaretDown /></div>
        {showHardcoded &&
            <div className="hardcoded_details_container">
            <div className="hardcoded_details__description">Two hard-coded users just for testing purposes</div>
            <button className="hardcoded_details__admin" onClick={loginAsAdmin}>Admin</button>
            <button className="hardcoded_details__user" onClick={loginAsUser}>User</button>
        </div>
        }
        <div className="login__signup_url_container">
            <Link to={'/signup'}>Create an account</Link>
        </div>
    </>
)
}

export default Login;