import { retry } from 'redux-saga/effects';
import * as types from '../actions/types';

const initialState = {
    isLoading: false,
    token: {}
}


export default function loginAdminReducers(state=initialState, action) {
    switch(action.type) {
        case types.LOGIN_ADMIN: 
            return {...state};
        case types.SUCCESS_LOGIN_ADMIN:
            localStorage.setItem('token', action.payload.token);
            return {...state, token: action.payload};
        case types.FAILURE_LOGIN_ADMIN:
            alert("Ведутся технические работы, по пробуйте позже!");
            return state;
        default:
            return state;
    }
}
