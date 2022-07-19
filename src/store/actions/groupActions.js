import * as types from './types';

export function getActiveGroups(){
    return {type: types.GET_ACTIVE_GROUPS}
}

export function getGroups(){
    return {type: types.GET_GROUPS}
}

export function createGroup(name, start, end){
    return {type: types.CREATE_GROUP, name, start, end}
}


export function deleteActiveGroup(id){
    return {type: types.DELETE_ACTIVE_GROUP, id}
}


export function updateActiveGroup(data){
    return {type: types.UPDATE_ACTIVE_GROUP, ...data}
}


