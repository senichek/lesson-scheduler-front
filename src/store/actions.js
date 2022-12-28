export const SET_USER = 'SET_USER';
export const LOGIN = 'LOGIN';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const setUser = (data) => ({
    type: SET_USER,
    payload: data,
});

export const login = () => ({
    type: LOGIN,
});

export const setLoginFailure = (data) => ({
    type: LOGIN_FAILED,
    payload: data,
});

