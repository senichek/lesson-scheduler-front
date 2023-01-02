import axios from 'axios';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../constants';
import { CREATE_LESSON } from '../store/actions';

const lessonCRUD = (store) => (next) => async (action) => {
    debugger
    switch (action.type) {
    case CREATE_LESSON: {
        const state = store.getState();
        const { from, to } = state.lesson;
        const { token } = state.user;
        try {
            const { data } = await axios.post(`${API_BASE_URL}/lesson/create`, {from, to}, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            if (data.id) {
                toast.success("Time slot has been created", {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            //store.dispatch(setUser(data));
        } catch (error) {
            console.log(error);
            //store.dispatch(setLoginFailure(true));
        }
        break;
    }

    default:
        next(action);
        break;
    }
};

export default lessonCRUD;