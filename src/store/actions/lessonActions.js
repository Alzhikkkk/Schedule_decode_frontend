import * as types from './types';

export function createLesson(data){
    return {type: types.CREATE_LESSON_IN_WEEK, data}
}

export function createBusy(data){
    return {type: types.CREATE_BUSY_IN_WEEK, data}
}

export function deleteLesson(id){
    return {type: types.DELETE_LESSON, id}
}


export function updateLesson(data){
    return {type: types.UPDATE_LESSON, ...data}
}


export function deleteBusy(id){
    return {type: types.DELETE_BUSY, id}
}


export function updateBusy(data){
    return {type: types.UPDATE_BUSY, ...data}
}