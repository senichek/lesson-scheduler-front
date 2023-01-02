import { SET_USER, CHANGE_INPUT_VALUE, LOGOUT } from "../store/actions";

export const initialState = {
    logged: false,
    name: '',
    id: '',
    email: '',
    password: '',
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
            token: action.payload.jwtToken,
            id: action.payload.id,
            role: action.payload.role
        };
    case CHANGE_INPUT_VALUE:
        return {
            ...state,
            [action.key]: action.value,
    };
    case LOGOUT:
        return initialState;
    default:
        return state;
    }
};
  
export default userReducer;