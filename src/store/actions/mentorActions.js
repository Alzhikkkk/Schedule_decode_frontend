import * as types from './types';

export function getMentors(){
    return {type: types.GET_MENTORS}
}

export function createMentor(name){
    return {type: types.CREATE_MENTOR, name}
}


export function deleteMentor(id){
    return {type: types.DELETE_MENTOR, id}
}


export function updateMentor(data){
    return {type: types.UPDATE_MENTOR, ...data}
}


