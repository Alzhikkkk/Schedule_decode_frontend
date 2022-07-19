import {all , put , takeLatest} from 'redux-saga/effects';
import * as types from '../actions/types';
import axios from 'axios'
import {BASE_URL} from '../../config/baseurl';

function* getCourses(){
    try{
        const courses = yield axios.get(`${BASE_URL}/api/courses`).then(res => res.data);
        yield put({type:types.RECIEVED_COURSES , payload : courses})
    }catch(e){
        yield put({type: types.FAILURE_GET_COURSES , errors: e})
    }
}


export function* courseSagas(){
    yield all([
        yield takeLatest(types.GET_COURSES, getCourses),
    ])
}