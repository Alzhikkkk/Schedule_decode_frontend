import {all , put , takeLatest} from 'redux-saga/effects';
import * as types from '../actions/types';
import axios from 'axios'
import {BASE_URL} from '../../config/baseurl';

function* getMentors(){
    try{
        const mentors = yield axios.get(`${BASE_URL}/api/mentors`).then(res => res.data);
        yield put({type:types.RECIEVED_GET_MENTORS , payload : mentors})
    }catch(e){
        yield put({type: types.FAILURE_GET_MENTORS , errors: e})
    }
}


function* createMentor({name, headers}){
    try{
        const mentor = yield axios.post(`${BASE_URL}/api/mentors`, {full_name: name}, {headers: {'authorization': `Bearer ${localStorage.getItem('token')}`}}).then(res => res.data);
        yield put({type:types.RECIEVED_NEW_MENTOR , payload : mentor})
    }catch(e){
        yield put({type: types.FAILURE_CREATE_MENTOR , errors: e})
    }
}


function* deleteMentor({id}){
    try{
        yield axios.delete(`${BASE_URL}/api/mentors/${id}`, {headers: {'authorization': `Bearer ${localStorage.getItem('token')}`}}).then(res => res.data);
        yield put({type:types.SUCCESS_DELETE_MENTOR , payload: {id}})
    }catch(e){
        yield put({type: types.FAILURE_DELETE_MENTOR , errors: e})
    }
}

function* updateMentor({id, name}){
    try{
        yield axios.put(`${BASE_URL}/api/mentors`, {id, full_name: name}, {headers: {'authorization': `Bearer ${localStorage.getItem('token')}`}}).then(res => res.data);
        yield put({type:types.SUCCESS_UPDATE_MENTOR , payload: {id, full_name: name}})
    }catch(e){
        yield put({type: types.FAILURE_UPDATE_MENTOR , errors: e})
    }
}




export function* mentorSagas(){
    yield all([
        yield takeLatest(types.GET_MENTORS, getMentors),
        yield takeLatest(types.CREATE_MENTOR, createMentor),
        yield takeLatest(types.DELETE_MENTOR, deleteMentor),
        yield takeLatest(types.UPDATE_MENTOR, updateMentor),
    ])
}