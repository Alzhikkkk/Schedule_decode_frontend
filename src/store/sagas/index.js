import {all} from 'redux-saga/effects';

import { mentorSagas } from './mentorSagas';
import { searchSagas } from './searchSagas';
import { groupSagas } from './groupSagas';
import { courseSagas } from './courseSagas';
import { roomSagas } from './roomSagas';
import { lessonSagas } from './lessonSagas';

export default function* rootSaga(){
    yield all([
        mentorSagas(),
        searchSagas(),
        groupSagas(),
        courseSagas(),
        roomSagas(),
        lessonSagas(),
    ])
}