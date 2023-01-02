import axios from 'axios';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../constants';
import { CREATE_LESSON, GET_LESSONS, setLessons } from '../store/actions';

const lessonCRUD = (store) => (next) => async (action) => {
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
                // If new lesson (aka timeslot) was created successfully we have toupdate our state:
                // 1. Extract current lessons from state;
                const { lessons } = state.user;
                // 2. Add new lesson (timeslot) to the collection;
                const lessonz = [...lessons, data];
                // 3. Update state
                store.dispatch(setLessons(lessonz));
            }
        } catch (error) {
            console.log(error);
        }
        break;
    }
    case GET_LESSONS: {
        const state = store.getState();
        const { token } = state.user;
        try {
            const { data } = await axios.get(`${API_BASE_URL}/lesson/all`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            store.dispatch(setLessons(data));
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