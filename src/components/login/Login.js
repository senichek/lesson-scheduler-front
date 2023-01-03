import { useDispatch, useSelector } from 'react-redux';
import { changeInputValue, login } from '../../store/actions';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './style.scss';

const Login = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    // Passing the input name and its value to Store.
    const onInputChange = (event) => {
        dispatch(changeInputValue(event.target.name, event.target.value));
    };

    const email = useSelector((state) => state.user.email);
    const password = useSelector((state) => state.user.password);
    const role = useSelector((state) => state.user.role);
    const isLogged = useSelector((state) => state.user.logged);

    useEffect(() => {
        if (role === '[ROLE_ADMIN]') {
            return navigate('/admindashboard');
        }; 
        if (role === '[ROLE_USER]') {
            return navigate('/userdashboard');
        }
    }, [isLogged]);

    const handleFormSubmit = (event) => {
        event.preventDefault();
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
    </>
)
}

export default Login;