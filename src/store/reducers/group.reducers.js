import * as types from '../actions/types';

const initialState = {
    isLoading: false,
    activeGroups: []
}


export default function groupsReducers(state=initialState, action) {
    switch(action.type) {
        case types.RECIEVED_ACTIVE_GROUPS: 
            return {...state, activeGroups: action.payload};
        case types.FAILURE_GET_ACTIVE_GROUPS:
            alert("Ведутся технические работы, по пробуйте позже!");
            return state;
        

        case types.CREATE_GROUP: 
            return {...state, isLoading: true}
        case types.RECIEVED_NEW_GROUP: 
            return {...state, isLoading: false, activeGroups: [...state.activeGroups, action.payload]}      
        case types.FAILURE_CREATE_GROUP:
            alert(JSON.stringify(action.errors));
            return {...state, isLoading: false};

        case types.SUCCESS_DELETE_ACTIVE_GROUP: 
            return {...state, activeGroups: removeById(state.activeGroups, action.payload.id)}
        case types.FAILURE_DELETE_ACTIVE_GROUP: 
            alert("Ведутся технические работы, по пробуйте позже!");
            return state;
        case types.UPDATE_ACTIVE_GROUP: 
            return {...state, isLoading: true}
        case types.SUCCESS_UPDATE_ACTIVE_GROUP: 
            console.log(action.payload)
            return {...state, isLoading: false, activeGroups: updateGroup(state.activeGroups, action.payload)}      
        case types.FAILURE_UPDATE_ACTIVE_GROUP:
            alert(JSON.stringify(action.errors));
            return {...state, isLoading: false};
        default:
            return state;
    }
}

function removeById(arr, id) {
    return arr.filter(item => item.id !== id)
}

function updateGroup(arr, item) {
    return arr.map(record => record.id === item.id ? item : record)
}