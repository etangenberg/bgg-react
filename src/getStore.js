import {createStore, combineReducers, applyMiddleware} from 'redux';
//import {identity} from 'lodash';
import createSagaMiddleware from 'redux-saga';
import {createLogger} from 'redux-logger';
import fetchBoardgamesSaga from './sagas/fetch-boardgames.saga';
import * as reducers from './reducers';

export default function( defaultState){
    const sagaMiddleware = createSagaMiddleware();
    const middlewareChain = [sagaMiddleware];
    if(process.env.NODE_ENV === 'development'){
        const logger = createLogger();
        middlewareChain.push(logger);
    }

    const store = createStore(combineReducers({...reducers}),defaultState,applyMiddleware(...middlewareChain));
    sagaMiddleware.run(fetchBoardgamesSaga);
    return store;
}