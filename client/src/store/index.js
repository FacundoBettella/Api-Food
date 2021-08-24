import { createStore, applyMiddleware, compose } from 'redux';
import reducer from '../reducer/index';
import thunk from "redux-thunk"; //Redux Thunk se usa con mayor frecuencia para comunicarse de manera asíncrona con una API externa.

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// const composeEnhancer = + window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))
export default store;