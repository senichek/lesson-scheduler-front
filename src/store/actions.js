export const SET_USER = 'SET_USER';
export const LOGIN = 'LOGIN';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const CHANGE_INPUT_VALUE = 'CHANGE_INPUT_VALUE';
export const SET_START_END = 'SET_START_END';
export const CREATE_LESSON = 'CREATE_LESSON';
export const LOGOUT = 'LOGOUT';
export const GET_LESSONS = 'GET_LESSONS';
export const GET_UNRESERVED_LESSONS = 'GET_UNRESERVED_LESSONS';
export const SET_LESSONS = 'SET_LESSONS';
export const DELETE_LESSON = 'DELETE_LESSON';
export const RESERVE_LESSON = 'RESERVE_LESSON';
export const GET_RESERVED_LESSONS = 'GET_RESERVED_LESSONS';
export const CANCEL_LESSON = 'CANCEL_LESSON';
export const GET_SINGLE_LESSON = 'GET_SINGLE_LESSON';
export const UPDATE_LESSON_DESCRIPTION = 'UPDATE_LESSON_DESCRIPTION';

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

export const logout = () => ({
    type: LOGOUT,
});

export const getLessons = () => ({
    type: GET_LESSONS,
});

export const getUnreservedLessons = () => ({
    type: GET_UNRESERVED_LESSONS,
});

export const setLessons = (data) => ({
    type: SET_LESSONS,
    payload: data
});

export const deleteLesson = (id) => ({
    type: DELETE_LESSON,
    payload: id
});

export const reserveLesson = (id) => ({
    type: RESERVE_LESSON,
    payload: id
});

export const getReservedLessons = () => ({
    type: GET_RESERVED_LESSONS,
});

export const cancelLesson = (id) => ({
    type: CANCEL_LESSON,
    payload: id
});

export const getSingleLesson = (id) => ({
    type: GET_SINGLE_LESSON,
    payload: id
});

export const updateLessonDescription = (data, id) => ({
    type: UPDATE_LESSON_DESCRIPTION,
    payload: data,
    id
});