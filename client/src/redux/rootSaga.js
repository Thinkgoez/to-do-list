import { call, put, takeEvery, delay, fork } from 'redux-saga/effects'
import { firebaseApi } from '../api/api'
import { noteWatcherSaga } from './notesHandler/noteSagas'
import TYPES from './types'

export function* sagaWatcher() {
    try {
        yield fork(noteWatcherSaga)
        yield takeEvery(SHOW_ALERT, showAlertSaga)
        yield takeEvery(REQUEST_PROJECTS, fetchProjectsSaga)
        yield takeEvery(REQUEST_ADD_PROJECT, addProjectSaga)
        yield takeEvery(REQUEST_REMOVE_PROJECT, removeProjectSaga)
        yield takeEvery(ADD_USER_TO, addUserToProjectSaga)
        yield takeEvery(REQUEST_UPDATE_SETTINGS, changeProjectSaga)
    } catch (error) {
        console.log(error)
        yield put({ type: TYPES.SHOW_ALERT, payload: { text: 'Что-то пошло не так', type: 'danger' } })
    }
}


function* fetchProjectsSaga(action) {
    yield put({ type: CHANGE_LOADER, payload: { loading: true } })
    const res = yield call(firebaseApi.getProjects, action.userID)
    let payload = []
    if (res.data) {
        payload = Object.keys(res.data).filter(key => res.data[key].followingUsers.includes(action.userID)).map(key => ({ ...res.data[key], id: key }))
    }

    yield put({ type: FETCH_PROJECT, payload })
    yield put({ type: CHANGE_LOADER, payload: { loading: false } })

}

function* addProjectSaga(action) {
    try {
        const res = yield call(firebaseApi.addProject, action.project);
        yield put({
            type: ADD_PROJECT,
            payload: {
                ...action.project,
                id: res.data.name
            }
        })
        yield put({
            type: SHOW_ALERT,
            payload: { text: 'Проект был создан!', type: 'success' }
        })
    } catch (e) {
        console.log(e)
        yield put({ type: SHOW_ALERT, payload: { text: 'Что-то пошло не так', type: 'danger' } })
    }
}
function* removeProjectSaga(action) {
    try {
        const res = yield call(firebaseApi.removeProject, action.projectID);
        if (res.status === 200) {
            yield put({
                type: REMOVE_PROJECT,
                payload: action.projectID
            })
            yield put({ type: SHOW_ALERT, payload: { text: 'Проект успешно удален', type: 'success' } })

        }
    } catch (e) {
        console.log(e)
        yield put({ type: SHOW_ALERT, payload: { text: 'Что-то пошло не так', type: 'danger' } })
    }
}

function* changeProjectSaga(action) {
    try {
        const res = yield call(firebaseApi.changeSettings, action.project, action.payload);
        if (res.status === 200) {
            yield put({
                type: CHANGE_SETTINGS,
                project: { ...action.project, ...action.payload }
            })
        }
    } catch (e) {
        console.log(e)
        yield put({ type: SHOW_ALERT, payload: { text: 'Что-то пошло не так', type: 'danger' } })
    }
}
function* showAlertSaga() {
    yield delay(2500)
    yield put({ type: HIDE_ALERT })
}

function* addUserToProjectSaga(action) {
    try {
        const res = yield call(firebaseApi.addUserToProject, action.project, action.userID)
        if (res.status === 200) {
            yield put({
                type: SUCC_ADDING,
                payload: { project: action.project, userID: action.userID }
            })
        }
    } catch (e) {
        console.log(e)
        yield put({ type: SHOW_ALERT, payload: { text: 'Что-то пошло не так', type: 'danger' } })
    }
}
