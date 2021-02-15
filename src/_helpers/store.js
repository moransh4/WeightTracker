import regeneratorRuntime from 'regenerator-runtime'
import { createStore, applyMiddleware, compose  } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../_saga/root-saga'
import { createLogger } from 'redux-logger';
import rootReducer from '../_reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { validatetorMiddleware }  from '../_Middleware/ValidatetorMiddleware';

const loggerMiddleware = createLogger();

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
    rootReducer,
    composeWithDevTools
        (applyMiddleware(
         thunkMiddleware,
        loggerMiddleware,
        validatetorMiddleware,
        sagaMiddleware
         ))
     );

sagaMiddleware.run(rootSaga)