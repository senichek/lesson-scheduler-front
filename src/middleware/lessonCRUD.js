import axios from 'axios';
import { API_BASE_URL } from '../constants';
import { CREATE_LESSON } from '../store/actions';

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