import {all , put , takeLatest} from 'redux-saga/effects';
import * as types from '../actions/types';
import axios from 'axios'
import {BASE_URL} from '../../config/baseurl';

function* getRooms(){
    try{
        const rooms = yield axios.get(`${BASE_URL}/api/rooms`).then(res => res.data);
        yield put({type:types.RECIEVED_ROOMS , payload : rooms})
    }catch(e){
        yield put({type: types.FAILURE_GET_ROOMS , errors: e})
    }
}


export function* roomSagas(){
    yield all([
        yield takeLatest(types.GET_ROOMS, getRooms),
    ])
}