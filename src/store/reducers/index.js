import {combineReducers} from 'redux';
import mentorsReducers from './mentor.reducers';
import searchReducers from './search.reducers';
import roomsReducers from './rooms.reducers';
import coursesReducers from './course.reducers';
import groupsReducers from './group.reducers';
import lessonsReducers from './lesson.reducers';

export default combineReducers({
    mentorsReducers,
    searchReducers,
    roomsReducers,
    coursesReducers,
    groupsReducers,
    lessonsReducers
})