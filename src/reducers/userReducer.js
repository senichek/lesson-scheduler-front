import { SET_USER, CHANGE_INPUT_VALUE, LOGOUT, SET_LESSONS, SET_UPDATED_DETAILS } from "../store/actions";

export const initialState = {
    logged: false,
    name: '',
    id: '',
    email: '',
    password: '',
    passwordConfirm: '',
    passwordOld: '',
    token: '',
    role: '',
    showSignUpSuccessMessage: false,
    showLoginFailureMessage: false,
    lessons: []
};
  
const userReducer = (state = initialState, action = {}) => {
    switch (action.type) {
    case SET_USER:
        return {
            ...state,
            logged: true,
            name: action.payload.name,
            email: action.payload.email,
            token: action.payload.jwtToken,
            id: action.payload.id,
            role: action.payload.role
        };
    case CHANGE_INPUT_VALUE:
        return {
            ...state,
            [action.key]: action.value,
    };
    case SET_LESSONS:
        return {
            ...state,
            //lessons: [...state.lessons, action.payload] - this will put array into another array
            lessons: action.payload
        };
    case LOGOUT:
        return initialState;
    case SET_UPDATED_DETAILS:
        return {
            ...state,
            name: action.payload.name,
            email: action.payload.email
        };
    default:
        return state;
    }
};
  
export default userReducer;