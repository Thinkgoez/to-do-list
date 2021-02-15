import { put, takeEvery, delay, takeLatest } from 'redux-saga/effects'
import TYPES from './types'

import {
    fetchProjectsSaga, addProjectSaga, removeProjectSaga,
    addUserToProjectSaga, updateProjectSaga
} from './projectsHandler/projectsSagas'
import { fetchNotesSaga, addNoteSaga, removeNoteSaga, changeCompleteSaga } from './notesHandler/noteSagas'
import { loginSaga, logoutSaga, registerSaga } from './authHandler/authSagas'


export function* sagaWatcher() {
    try {
        yield takeEvery(TYPES.REQUEST_LOGIN_USER, loginSaga)
        yield takeEvery(TYPES.REQUEST_CREATE_USER, registerSaga)
        yield takeEvery(TYPES.REQUEST_LOGOUT, logoutSaga)

        yield takeEvery(TYPES.REQUEST_PROJECTS, fetchProjectsSaga)
        yield takeEvery(TYPES.REQUEST_ADD_PROJECT, addProjectSaga)
        yield takeEvery(TYPES.REQUEST_REMOVE_PROJECT, removeProjectSaga)
        yield takeEvery(TYPES.ADD_USER_TO, addUserToProjectSaga)
        yield takeEvery(TYPES.REQUEST_UPDATE_PROJECT, updateProjectSaga)

        yield takeLatest(TYPES.REQUEST_NOTES, fetchNotesSaga)
        yield takeEvery(TYPES.REQUEST_ADD_NOTE, addNoteSaga)
        yield takeEvery(TYPES.REQUEST_REMOVE_NOTE, removeNoteSaga)
        yield takeEvery(TYPES.REQUEST_COMPLETE_NOTE, changeCompleteSaga)

        yield takeEvery(TYPES.SHOW_ALERT, showAlertSaga)

        
    } catch (error) {
        console.log(error)
        yield put({ type: TYPES.SHOW_ALERT, payload: { text: 'Что-то пошло не так', type: 'danger' } })
    }
}

function* showAlertSaga() {
    yield delay(2500)
    yield put({ type: TYPES.HIDE_ALERT })
}

