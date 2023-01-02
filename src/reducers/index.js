import { combineReducers } from 'redux';
import userReducer from './userReducer';
import lessonReducer from './lessonReducer';

const rootReducer = combineReducers({
    user: userReducer,
    lesson: lessonReducer
});

export default rootReducer;