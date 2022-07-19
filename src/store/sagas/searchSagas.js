import {all , put , takeLatest} from 'redux-saga/effects';
import * as types from '../actions/types';
import axios from 'axios'
import {BASE_URL} from '../../config/baseurl';

function* searchLessons({data}){
    try{
        const activities = yield axios.get(`${BASE_URL}/api/search?${data.key}=${data.value}`).then(res => res.data);
        yield put({type:types.SUCCESS_SEARCH_LESSONS , payload : activities})
    }catch(e){
        yield put({type: types.FAILURE_SEARCH_LESSONS , errors: e})
    }
}

function* autoCompliteFunc({key}){
    try{
        const autoCompliteData = yield axios.get(`${BASE_URL}/api/search/${key}`).then(res => res.data);
        yield put({type:types.SUCCESS_AUTO_COMPLITE , payload : autoCompliteData})
    }catch(e){
        yield put({type: types.FAILURE_AUTO_COMPLITE , errors: e})
    }
}




export function* searchSagas(){
    yield all([
        yield takeLatest(types.SEARCH_LESSONS, searchLessons),
        yield takeLatest(types.AUTO_COMPLITE, autoCompliteFunc),
    ])
}