// Redux
// import { createStore, applyMiddleware, compose } from 'redux';
// // Reducer
// import rootReducer from './reducer';
// // Thunk
// import {thunkMiddleware} from 'redux-thunk'

// const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__ || compose

// const store = createStore(  
//   rootReducer,
//   composerEnhancer(applyMiddleware(thunkMiddleware))
// );

// export default store;

import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer';
import thunkMiddleware from 'redux-thunk';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    reducer,
    composeEnhancer(applyMiddleware(thunkMiddleware))
    // esta línea es para poder hacer peticiones a un server
);