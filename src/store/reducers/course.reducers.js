import * as types from '../actions/types';

const initialState = {
    isLoading: false,
    courses: []
}


export default function coursesReducers(state=initialState, action) {
    switch(action.type) {
        case types.RECIEVED_COURSES: 
            return {...state, courses: action.payload};
        case types.FAILURE_GET_COURSES:
            alert("Ведутся технические работы, по пробуйте позже!");
            return state;
        default:
            return state;
    }
}

