export const SET_USER = 'SET_USER';
export const LOGIN = 'LOGIN';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const CHANGE_INPUT_VALUE = 'CHANGE_INPUT_VALUE';
export const SET_START_END = 'SET_START_END';
export const CREATE_LESSON = 'CREATE_LESSON';

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

export const changeInputValue = (inputName, inputValue) => ({
    type: CHANGE_INPUT_VALUE,
    key: inputName,
    value: inputValue,
});

export const setStartEnd = (from, to) => ({
    type: SET_START_END,
    from: from,
    to: to
});

export const createLesson = () => ({
    type: CREATE_LESSON,
});

