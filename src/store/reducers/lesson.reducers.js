import * as types from '../actions/types';

const initialState = {
    isLoading: false,
    errors: null
}


export default function lessonsReducers(state=initialState, action) {
    switch(action.type) {

    
        case types.CREATE_LESSON_IN_WEEK: 
            return {...state, isLoading: true}

        case types.RECIEVED_NEW_LESSON_IN_WEEK: 
            return {...state, isLoading: false} 
        case types.FAILURE_CREATE_LESSON_IN_WEEK:
            return {...state, isLoading: false, errors: action.errors};
        case types.CREATE_BUSY_IN_WEEK: 
            return {...state, isLoading: true}
        case types.RECIEVED_NEW_BUSY_IN_WEEK: 
            return {...state, isLoading: false} 
        case types.FAILURE_CREATE_BUSY_IN_WEEK:
            return {...state, isLoading: false, errors: action.errors};
        default:
            return state;
    }
}

function removeById(arr, id) {
    return arr.filter(item => item.id !== id)
}

function updateMentor(arr, item) {
    return arr.map(record => record.id === item.id ? item : record)
}