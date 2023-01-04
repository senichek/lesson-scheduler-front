import axios from 'axios';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../constants';
import { CREATE_LESSON, DELETE_LESSON, GET_LESSONS, GET_UNRESERVED_LESSONS, RESERVE_LESSON, setLessons } from '../store/actions';

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
    case GET_UNRESERVED_LESSONS: {
        const state = store.getState();
        const { token } = state.user;
        try {
            const { data } = await axios.get(`${API_BASE_URL}/lesson/all/unreserved`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            store.dispatch(setLessons(data));
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
    case DELETE_LESSON: {
        const state = store.getState();
        const { token } = state.user;
        try {
            // action.payload holds the ID of the item we want to delete
            const { data } = await axios.get(`${API_BASE_URL}/lesson/delete/${action.payload}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Remove the deleted lesson (aka timeslot) from the state:
            // 1. Extract current lessons from state;
            const { lessons } = state.user;
            // 2. Filter out the deleted lesson (timeslot) from the collection;
            const lessonz = lessons.filter(ls => ls.id !== parseInt(action.payload));
            // 3. Update state
            store.dispatch(setLessons(lessonz));

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
    case RESERVE_LESSON: {
        const state = store.getState();
        const { token } = state.user;
        try {
            // action.payload holds the ID of the item we want to reserve
            const { data } = await axios.get(`${API_BASE_URL}/lesson/reserve/${action.payload}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Remove the reserved lesson, otherwise it will be visible and lead to the confusion:
            // 1. Extract current lessons from state;
            const { lessons } = state.user;
            // 2. Filter out the reserved lesson (timeslot) from the collection;
            const lessonz = lessons.filter(ls => ls.id !== parseInt(action.payload));
            // 3. Update state
            store.dispatch(setLessons(lessonz));

            toast.success(`The slot ${data.id} has been booked`, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

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

export default lessonCRUD;