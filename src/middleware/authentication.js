import axios from 'axios';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../constants';
import { LOGIN, setUser, setLoginFailure, SIGN_UP } from '../store/actions';

const authentication = (store) => (next) => async (action) => {
    switch (action.type) {
    case LOGIN: {
        const state = store.getState();
        const { email, password } = state.user;
        try {
            const { data } = await axios.post(`${API_BASE_URL}/login`, {
                email,
                password,
            });
            store.dispatch(setUser(data));
            // Store the user in localStorage
            // Local storage only supports string datatype
            localStorage.setItem('loggedInUser', JSON.stringify({...data, connectedAt: new Date()}));
        } catch (error) {
            console.log(error);
            store.dispatch(setLoginFailure(true));
        }
        break;
    }
    case SIGN_UP: {
        const state = store.getState();
        const { name, email, password, passwordConfirm } = state.user;
        try {
            const { data } = await axios.post(`${API_BASE_URL}/signup`, {
                name,
                email,
                password,
                passwordConfirm
            });
            store.dispatch(setUser(data));
            // Store the user in localStorage
            // Local storage only supports string datatype
            localStorage.setItem('loggedInUser', JSON.stringify({...data, connectedAt: new Date()}));
        } catch (error) {
            console.log(error);
            toast.warning(error.response.data, {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        break;
    }

    default:
        next(action);
        break;
    }
};

export default authentication;