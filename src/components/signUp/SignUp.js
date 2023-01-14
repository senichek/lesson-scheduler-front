import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { changeInputValue, signUp } from "../../store/actions";
import { useEffect } from "react";
import { toast } from 'react-toastify';
import './style.scss';

const SignUp = () => {

    const name = useSelector((state) => state.user.name);
    const email = useSelector((state) => state.user.email);
    const password = useSelector((state) => state.user.password);
    const passwordConfirm = useSelector((state) => state.user.passwordConfirm);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Passing the input name and its value to Store.
    const onInputChange = (event) => {
        dispatch(changeInputValue(event.target.name, event.target.value));
    };

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
        if (password !== passwordConfirm) {
            console.log("Error. Passwords are not the same.")
        }
        dispatch(signUp());
    }

  return (
    <>
    <div className="signup__header">Lessons Booking</div>
        <form className="signup__form" onSubmit={handleFormSubmit}>
            <div>
                    <input
                        className="signup__name_input"
                        type="name"
                        required={true}
                        value={name}
                        onChange={(event) => onInputChange(event)}
                        placeholder="Enter name"
                        name="name"
                    />
            </div>
            <div>
                    <input
                        className="signup__email_input"
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
                        className="signup__password_input"
                        type="password"
                        required={true}
                        value={password}
                        onChange={(event) => onInputChange(event)}
                        placeholder="Enter password"
                        name="password"
                    />
            </div>
            <div>
                    <input
                        className="signup__password_input"
                        type="password"
                        required={true}
                        value={passwordConfirm}
                        onChange={(event) => onInputChange(event)}
                        placeholder="Confirm password"
                        name="passwordConfirm"
                    />
            </div>
            <button className='signup__button' type="submit">Sign up</button>
        </form>
        
        <div className="signup__login_url_container">
            <Link to={'/'}>Have an account? Login</Link>
        </div>
    </>
  );
};

export default SignUp;
