import { SET_START_END } from "../store/actions";

export const initialState = {
    from: '',
    to: '',
};
  
const lessonReducer = (state = initialState, action = {}) => {
    switch (action.type) {
    case SET_START_END:
        return {
            ...state,
            from: action.from,
            to: action.to,
        };
    default:
        return state;
    }
};
  
export default lessonReducer;