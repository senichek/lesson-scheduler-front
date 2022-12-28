
const authentication = (store) => (next) => async (action) => {
    switch (action.type) {
    /* case LOGIN: {
        const state = store.getState();
        const { email, password } = state.user;
        try {
            const { data } = await axios.post(`${API_BASE_URL}/signin`, {
                email,
                password,
            });
            store.dispatch(setUser(data));
            // Store the user in localStorage
            // Local storage only supports string datatype
            localStorage.setItem('loggedInUser', JSON.stringify({...data, connectedAt: new Date()}));
        } catch (error) {
            console.log(error);
            store.dispatch(setLoginFailure(true));
        }
        break;
    } */

    default:
        next(action);
        break;
    }
};

export default authentication;