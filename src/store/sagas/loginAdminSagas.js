import {all , put , takeLatest} from 'redux-saga/effects';
import * as types from '../actions/types';
import axios from 'axios'
import {BASE_URL} from '../../config/baseurl';
import { useNavigate } from 'react-router-dom';

function* login({data, navigate}){
    try{
        console.log(data)
        const admin_token = yield axios.post(`${BASE_URL}/api/signin`, data).then(res => res.data);
        // console.log(admin_token)
        if (admin_token){
            axios.defaults.headers.common['authorization'] = `Bearer ${admin_token.token}`;
            localStorage.setItem('token',admin_token.token)
        }
        yield put({type:types.SUCCESS_LOGIN_ADMIN , payload : admin_token})
    }catch(e){
        yield put({type: types.FAILURE_LOGIN_ADMIN , errors: e})
    }
}

export function* loginAdminSagas(){
    yield all([
        yield takeLatest(types.LOGIN_ADMIN, login),
    ])
}