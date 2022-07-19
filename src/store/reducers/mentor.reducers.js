import * as types from '../actions/types';

const initialState = {
    isLoading: false,
    mentors: []
}


export default function mentorsReducers(state=initialState, action) {
    switch(action.type) {
        case types.RECIEVED_GET_MENTORS: 
            return {...state, mentors: action.payload};
        case types.FAILURE_GET_MENTORS:
            // alert(JSON.stringify(action.errors))
            alert("Ведутся технические работы, по пробуйте позже!");
            return state;

    
        case types.CREATE_MENTOR: 
            return {...state, isLoading: true}
        case types.RECIEVED_NEW_MENTOR: 
            return {...state, isLoading: false, mentors: [...state.mentors, action.payload]}      
        case types.FAILURE_CREATE_MENTOR:
            alert(JSON.stringify(action.errors));
            return {...state, isLoading: false};

        case types.SUCCESS_DELETE_MENTOR: 
            return {...state, mentors: removeById(state.mentors, action.payload.id)}
        case types.FAILURE_DELETE_MENTOR: 
            alert("Ведутся технические работы, по пробуйте позже!");
            return state;
        case types.UPDATE_MENTOR: 
            return {...state, isLoading: true}
        case types.SUCCESS_UPDATE_MENTOR: 
            return {...state, isLoading: false, mentors: updateMentor(state.mentors, action.payload)}      
        case types.FAILURE_UPDATE_MENTOR:
            alert(JSON.stringify(action.errors));
            return {...state, isLoading: false};
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