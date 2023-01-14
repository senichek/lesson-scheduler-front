import axios from 'axios';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../constants';
import { DETAILS_UPDATE, PASSWORD_UPDATE, setUpdatedDetails } from '../store/actions';

const userCRUD = (store) => (next) => async (action) => {
    switch (action.type) {
    case DETAILS_UPDATE: {
        const state = store.getState();
        const { id, name, email } = state.user;
        const { token } = state.user;
        try {
            const { data } = await axios.post(`${API_BASE_URL}/user/detailsupdate`, {id, name, email}, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            if (data.id) {
                store.dispatch(setUpdatedDetails(data));
                // update localstorage
                const current = JSON.parse(localStorage.getItem('loggedInUser'));
                current.name = data.name;
                current.email = data.email;
                localStorage.setItem('loggedInUser', JSON.stringify({...current}));
                console.log(current);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        break;
    }
    case PASSWORD_UPDATE: {
        const state = store.getState();
        const { id, passwordOld, password, passwordConfirm } = state.user;
        const { token } = state.user;
        try {
            const { data } = await axios.post(`${API_BASE_URL}/user/passwordupdate`, {id, passwordOld, password, passwordConfirm}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (data.id) {
                toast.success("Password has been updated", {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data, {
                position: "bottom-center",
                autoClose: 5000,
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

export default userCRUD;