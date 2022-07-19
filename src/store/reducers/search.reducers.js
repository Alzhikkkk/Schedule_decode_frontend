import * as types from '../actions/types';

const initialState = {
    // isLoading: false,
    list: [],
    autoCompliteData: {}
}


export default function searchReducers(state=initialState, action) {
    switch(action.type) {
        case types.SUCCESS_SEARCH_LESSONS: 
            return {...state, list: action.payload};
        case types.FAILURE_SEARCH_LESSONS:
            // alert(JSON.stringify(action.errors))
            alert("Ведутся технические работы, по пробуйте позже!");
            return state;
        case types.SUCCESS_AUTO_COMPLITE: 
            return {...state, autoCompliteData: action.payload};
        case types.FAILURE_AUTO_COMPLITE:
            // alert(JSON.stringify(action.errors))
            alert("Ведутся технические работы, по пробуйте позже!");
            return state;
        

        case types.RECIEVED_NEW_LESSON_IN_WEEK: 
            return {...state, list: [...state.list, ...action.payload]} 

        case types.RECIEVED_NEW_BUSY_IN_WEEK: 
            return {...state, list: [...state.list, ...action.payload]} 
        
        case types.SUCCESS_DELETE_LESSON: 
            return {...state, list: removeById(state.list, action.payload.id)}
        case types.FAILURE_DELETE_LESSON: 
            alert("Ведутся технические работы, по пробуйте позже!");
            return state;
        case types.SUCCESS_DELETE_BUSY: 
            return {...state, list: removeById(state.list, action.payload.id)}
        case types.FAILURE_DELETE_BUSY: 
            alert("Ведутся технические работы, по пробуйте позже!");
        
        case types.UPDATE_BUSY: 
            return {...state, isLoading: true}
        case types.SUCCESS_UPDATE_BUSY: 
            return {...state, isLoading: false, list: updateLesson(state.list, action.payload)}      
        case types.FAILURE_UPDATE_BUSY:
            alert(JSON.stringify(action.errors));
            return {...state, isLoading: false};

        case types.UPDATE_LESSON: 
            return {...state, isLoading: true}
        case types.SUCCESS_UPDATE_LESSON: 
            // console.log(updateLesson(state.list, action.payload)) 
            return {...state, isLoading: false, list: updateLesson(state.list, action.payload)}      
        case types.FAILURE_UPDATE_LESSON:
            alert(JSON.stringify(action.errors)+"1");
            return {...state, isLoading: false};

        case types.UPDATE_BUSY: 
            return {...state, isLoading: true}
        case types.SUCCESS_UPDATE_BUSY: 
            // console.log(updateLesson(state.list, action.payload)) 
            return {...state, isLoading: false, list: updateLesson(state.list, action.payload)}      
        case types.FAILURE_UPDATE_BUSY:
            alert(JSON.stringify(action.errors)+"1");
            return {...state, isLoading: false};
        default:
            return state;
    }
}

function removeById(arr, id) {
    return arr.filter(item => item.id !== id)
}

function updateLesson(arr, item) {
    return arr.map(record => record.id === item.id ? item : record)
}