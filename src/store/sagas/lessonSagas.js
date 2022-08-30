import {all , put , takeLatest} from 'redux-saga/effects';
import * as types from '../actions/types';
import axios from 'axios'
import {BASE_URL} from '../../config/baseurl';

function* createLesson({data}){
    try{
        const lessons = yield axios.post(`${BASE_URL}/api/lesson-in-week`, data, {headers: {'authorization': `Bearer ${localStorage.getItem('token')}`}}).then(res => res.data);
        yield put({type:types.RECIEVED_NEW_LESSON_IN_WEEK , payload : lessons})
    }catch(e){
        console.log("SAGE: ", e)
        yield put({type: types.FAILURE_CREATE_LESSON_IN_WEEK , errors: e.response.data})
    }
}

function* createBusy({data}){
    try{
        const busytimes = yield axios.post(`${BASE_URL}/api/busy-in-week`, data, {headers: {'authorization': `Bearer ${localStorage.getItem('token')}`}}).then(res => res.data);
        yield put({type:types.RECIEVED_NEW_BUSY_IN_WEEK , payload : busytimes})
    }catch(e){
        console.log("SAGE: ", e)
        yield put({type: types.FAILURE_CREATE_BUSY_IN_WEEK , errors: e.response.data})
    }
}


function* deleteLesson({id}){
    try{
         yield axios.delete(`${BASE_URL}/api/lesson_in_week/${id}`, {headers: {'authorization': `Bearer ${localStorage.getItem('token')}`}}).then(res => res.data);
         yield put({type: types.SUCCESS_DELETE_LESSON, payload: {id} })
    }catch(e){
         yield put({type: types.FAILURE_DELETE_LESSON, errors: e})
    }
}


function* deleteBusy({id}){
    try{
         yield axios.delete(`${BASE_URL}/api/busy_in_week/${id}`, {headers: {'authorization': `Bearer ${localStorage.getItem('token')}`}}).then(res => res.data);
         yield put({type: types.SUCCESS_DELETE_BUSY, payload: {id} })
    }catch(e){
         yield put({type: types.FAILURE_DELETE_BUSY, errors: e})
    }
}

function* updateLesson({id, time, weekday, course_id, room_id, mentor_id, group_id}){
    try{
         const lessons = yield axios.put(`${BASE_URL}/api/lesson_in_week`, {id, time, weekday, course_id, room_id, mentor_id, group_id}, {headers: {'authorization': `Bearer ${localStorage.getItem('token')}`}}).then(res => res.data);
         yield put({type: types.SUCCESS_UPDATE_LESSON, payload: lessons})
    }catch(e){
        yield put({type: types.FAILURE_UPDATE_LESSON, errors: e})
    }
}

function* updateBusy({id, time, weekday, mentor_id, text}){
    try{
         const busytimes = yield axios.put(`${BASE_URL}/api/busy_in_week`, {id, time, weekday, mentor_id, text}, {headers: {'authorization': `Bearer ${localStorage.getItem('token')}`}}).then(res => res.data);
         yield put({type: types.SUCCESS_UPDATE_BUSY, payload: busytimes})
    }catch(e){
        yield put({type: types.FAILURE_UPDATE_BUSY, errors: e})
    }
}



export function* lessonSagas(){
    yield all([
        yield takeLatest(types.CREATE_LESSON_IN_WEEK, createLesson),
        yield takeLatest(types.CREATE_BUSY_IN_WEEK, createBusy),
        yield takeLatest(types.DELETE_LESSON, deleteLesson),
        yield takeLatest(types.UPDATE_LESSON, updateLesson),
        yield takeLatest(types.DELETE_BUSY, deleteBusy),
        yield takeLatest(types.UPDATE_BUSY, updateBusy),

    ])
}