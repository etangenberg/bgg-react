import {put, take } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

export default function * fetchBoardgamesSaga(){
    while(true){
        yield take('REQUEST_FETCH_BOARDGAMES');
        const raw = yield fetch('/api/boardgames/catan');
        const json = yield raw.json();
        const games = json.boardgames;
        console.log("Got games:",games);
        yield put({type:'FETCHED_BOARDGAMES', games});
    }
}