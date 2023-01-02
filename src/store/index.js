import { createStore, applyMiddleware, compose } from 'redux';

import reducer from '../reducers';
import auth from '../middleware/authentication';
import lessonCRUD from '../middleware/lessonCRUD';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
    applyMiddleware(auth, lessonCRUD),
);

const store = createStore(reducer, enhancers);

export default store;