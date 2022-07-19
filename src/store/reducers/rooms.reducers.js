import * as types from '../actions/types';

const initialState = {
    isLoading: false,
    rooms: []
}


export default function roomsReducers(state=initialState, action) {
    switch(action.type) {
        case types.RECIEVED_ROOMS: 
            return {...state, rooms: action.payload};
        case types.FAILURE_GET_ROOMS:
            alert("Ведутся технические работы, по пробуйте позже!");
            return state;
        default:
            return state;
    }
}

