import {applyMiddleware} from 'redux';
import {legacy_createStore as createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../../saga/rootSaga';
import {rootReducer} from '../reducers/rootReducer';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
