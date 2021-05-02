import { put, takeEvery, delay, takeLatest } from 'redux-saga/effects';
import TYPES from '../actions/actionTypes';

import {
    fetchProjectsSaga, addProjectSaga, removeProjectSaga,
    updateProjectSaga
} from '../sagas/projectsSagas';
import { fetchNotesSaga, addNoteSaga, removeNoteSaga, changeCompleteSaga } from '../sagas/noteSagas';
import { loginSaga, logoutSaga, registerSaga, getProfileSaga } from '../sagas/authSagas';
import {getAllUsers,updatePassSaga,recoverySaga, privateSaga, updateUserData, notAuthorizeSaga, headerRequest} from './userSaga';

export function* sagaWatcher() {
    try {
        // AUTH
        yield takeEvery(TYPES.REQUEST_LOGIN_USER, loginSaga)
        yield takeEvery(TYPES.REQUEST_CREATE_USER, registerSaga)
        yield takeEvery(TYPES.REQUEST_LOGOUT, logoutSaga)
        yield takeEvery(TYPES.REQUEST_PROFILE, getProfileSaga)

        // PROJECTS
        yield takeEvery(TYPES.REQUEST_PROJECTS, fetchProjectsSaga)
        yield takeEvery(TYPES.REQUEST_ADD_PROJECT, addProjectSaga)
        yield takeEvery(TYPES.REQUEST_REMOVE_PROJECT, removeProjectSaga)
        // yield takeEvery(TYPES.ADD_USER_TO, addUserToProjectSaga)
        yield takeEvery(TYPES.REQUEST_UPDATE_PROJECT, updateProjectSaga)

        // NOTES
        yield takeLatest(TYPES.REQUEST_NOTES, fetchNotesSaga)
        yield takeEvery(TYPES.REQUEST_ADD_NOTE, addNoteSaga)
        yield takeEvery(TYPES.REQUEST_REMOVE_NOTE, removeNoteSaga)
        yield takeEvery(TYPES.REQUEST_COMPLETE_NOTE, changeCompleteSaga)

        yield takeEvery(TYPES.SHOW_ALERT, showAlertSaga)

        // USER
        yield  takeEvery(TYPES.GET_ALL_USERS, getAllUsers)
        yield  takeEvery(TYPES.GET_USER_ACTION, privateSaga)
        yield  takeLatest(TYPES.ACTION_UPDATE_PASS, updatePassSaga)
        yield  takeLatest(TYPES.AUTH_ACTION_PASS_RECOVERY, recoverySaga)
        yield  takeLatest(TYPES.UPDATE_USER_DATA, updateUserData)
        yield  takeLatest(TYPES.ONLY_FOR_NOT_AUTHORIZE_USERS, notAuthorizeSaga)
        yield  takeLatest(TYPES.HEADER_REQUEST_AUTHORIZE, headerRequest)

    } catch (error) {
        console.log(error)
        yield put({ type: TYPES.SHOW_ALERT, payload: { text: 'Что-то пошло не так', type: 'danger' } })
    }
}

function* showAlertSaga() {
    yield delay(2500)
    yield put({ type: TYPES.HIDE_ALERT })
}

