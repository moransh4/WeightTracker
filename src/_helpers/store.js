import { createStore, applyMiddleware, compose  } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../_reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { validatetorMiddleware }  from '../_Middleware/ValidatetorMiddleware';

const loggerMiddleware = createLogger();

export const store = createStore(
    rootReducer,
    composeWithDevTools
        (applyMiddleware(
        thunkMiddleware,
        loggerMiddleware,
        validatetorMiddleware
         ))
     );
