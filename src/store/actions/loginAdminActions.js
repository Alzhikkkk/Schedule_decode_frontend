import * as types from './types';

export function login(data, navigate){
    return {type: types.LOGIN_ADMIN, data, navigate}
}