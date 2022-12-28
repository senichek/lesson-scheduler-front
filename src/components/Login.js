import { useDispatch, useSelector } from 'react-redux';
import { changeInputValue, login } from '../store/actions';

const Login = () => {

    const dispatch = useDispatch();

    // Passing the input name and its value to Store.
    const onInputChange = (event) => {
        dispatch(changeInputValue(event.target.name, event.target.value));
    };

    const email = useSelector((state) => state.user.email);
    const password = useSelector((state) => state.user.password);
    const user = useSelector((state) => state.user);

    const handleFormSubmit = (event) => {
        event.preventDefault();
        dispatch(login());
    }

return(
    <>
        <form className="login__form" onSubmit={handleFormSubmit}>
            <div className="login__email_input">
                    <input
                        type="email"
                        required={true}
                        value={email}
                        onChange={(event) => onInputChange(event)}
                        placeholder="Enter email"
                        name="email"
                    />
            </div>
            <div className="login__password_input">
                    <input
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
        <div>
            The logged-in user is:
            <div>{user.id}</div>
            <div>{user.name}</div>
            <div>{user.role}</div>
            <div>{user.token}</div>
        </div>
    </>
)
}

export default Login;