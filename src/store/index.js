import { createStore, applyMiddleware, compose } from 'redux';

import reducer from '../reducers';
import auth from '../middleware/authentication';
import lessonCRUD from '../middleware/lessonCRUD';
import userCRUD from '../middleware/userCRUD';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
    applyMiddleware(auth, lessonCRUD, userCRUD),
);

const store = createStore(reducer, enhancers);

export default store;