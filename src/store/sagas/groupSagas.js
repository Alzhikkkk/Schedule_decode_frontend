import {all , put , takeLatest} from 'redux-saga/effects';
import * as types from '../actions/types';
import axios from 'axios'
import {BASE_URL} from '../../config/baseurl';

function* getActiveGroups(){
    try{
        const groups = yield axios.get(`${BASE_URL}/api/groups/filter/active`).then(res => res.data);
        yield put({type:types.RECIEVED_ACTIVE_GROUPS , payload : groups})
    }catch(e){
        yield put({type: types.FAILURE_GET_ACTIVE_GROUPS , errors: e})
    }
}

function* createGroup({name, start, end}){
    try{
        const groups = yield axios.post(`${BASE_URL}/api/groups`, {name,start,end}).then(res => res.data);
        yield put({type:types.RECIEVED_NEW_GROUP , payload : groups })
    }catch(e){
        yield put({type: types.FAILURE_CREATE_GROUP , errors: e})
    }
}


function* deleteActiveGroup({id}){
    try{
        yield axios.delete(`${BASE_URL}/api/groups/${id}`).then(res => res.data);
        yield put({type:types.SUCCESS_DELETE_ACTIVE_GROUP , payload: {id}})
    }catch(e){
        yield put({type: types.FAILURE_DELETE_ACTIVE_GROUP , errors: e})
    }
}

function* updateActiveGroup({id, name, start, end}){
    try{
        yield axios.put(`${BASE_URL}/api/groups`, {id, name: name, start:start, end:end}).then(res => res.data);
        yield put({type:types.SUCCESS_UPDATE_ACTIVE_GROUP , payload: {id, name: name, start:start, end:end}})
    }catch(e){
        yield put({type: types.FAILURE_UPDATE_ACTIVE_GROUP, errors: e})
    }
}




export function* groupSagas(){
    yield all([
        yield takeLatest(types.GET_ACTIVE_GROUPS, getActiveGroups),
        yield takeLatest(types.CREATE_GROUP, createGroup),
        yield takeLatest(types.DELETE_ACTIVE_GROUP, deleteActiveGroup),
        yield takeLatest(types.UPDATE_ACTIVE_GROUP, updateActiveGroup),
    ])
}