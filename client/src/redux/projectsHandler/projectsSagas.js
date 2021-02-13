import { call, put } from 'redux-saga/effects'
import { Api } from '../../api/api'
import TYPES from '../types'

export function* fetchProjectsSaga(action) {
    yield put({ type: TYPES.CHANGE_LOADER, payload: { loading: true } })
    const res = yield call(Api.getProjects, action.userID)
    let payload = []
    if (res.data) {
        payload = Object.keys(res.data).filter(key => res.data[key].followingUsers.includes(action.userID)).map(key => ({ ...res.data[key], id: key }))
    }

    yield put({ type: TYPES.FETCH_PROJECT, payload })
    yield put({ type: TYPES.CHANGE_LOADER, payload: { loading: false } })
}

export function* addProjectSaga(action) {
    try {
        const res = yield call(Api.addProject, action.project);
        yield put({
            type: TYPES.ADD_PROJECT,
            payload: {
                ...action.project,
                id: res.data.name
            }
        })
        yield put({
            type: TYPES.SHOW_ALERT,
            payload: { text: 'Проект был создан!', type: 'success' }
        })
    } catch (e) {
        console.log(e)
        yield put({ type: TYPES.SHOW_ALERT, payload: { text: 'Что-то пошло не так', type: 'danger' } })
    }
}
export function* removeProjectSaga(action) {
    try {
        const res = yield call(Api.removeProject, action.projectID);
        if (res.status === 200) {
            yield put({
                type: TYPES.REMOVE_PROJECT,
                payload: action.projectID
            })
            yield put({ type: TYPES.SHOW_ALERT, payload: { text: 'Проект успешно удален', type: 'success' } })

        }
    } catch (e) {
        console.log(e)
        yield put({ type: TYPES.SHOW_ALERT, payload: { text: 'Что-то пошло не так', type: 'danger' } })
    }
}

export function* changeProjectSaga(action) {
    try {
        const res = yield call(Api.changeSettings, action.project, action.payload);
        if (res.status === 200) {
            yield put({
                type: TYPES.CHANGE_SETTINGS,
                project: { ...action.project, ...action.payload }
            })
        }
    } catch (e) {
        console.log(e)
        yield put({ type: TYPES.SHOW_ALERT, payload: { text: 'Что-то пошло не так', type: 'danger' } })
    }
}
export function* addUserToProjectSaga(action) {
    try {
        const res = yield call(Api.addUserToProject, action.project, action.userID)
        if (res.status === 200) {
            yield put({
                type: TYPES.SUCC_ADDING,
                payload: { project: action.project, userID: action.userID }
            })
        }
    } catch (e) {
        console.log(e)
        yield put({ type: TYPES.SHOW_ALERT, payload: { text: 'Что-то пошло не так', type: 'danger' } })
    }
}