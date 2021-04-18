import { call, put } from 'redux-saga/effects'
import jwt_decode from 'jwt-decode';
import { Api } from '../../api/api'
import TYPES from '../types'



export function* fetchProjectsSaga(action) {
    try{
        yield put({ type: TYPES.CHANGE_LOADER, payload: { loading: true } })
        const res = yield call(Api.getAllProjects, action.userID)
        let payload = []
        if (res.data) {
            payload = res.data.map(project => setOwnerHelper(project))
        }
        yield put({ type: TYPES.FETCH_PROJECT, payload })
        yield put({ type: TYPES.CHANGE_LOADER, payload: { loading: false } })
    } catch (error) {
        console.log(error)
        yield put({type: TYPES.REQUEST_ERROR, payload: { text: 'Возникла ошибка при загрузки проектов', type: 'danger' }})
    }
    
}

export function* addProjectSaga(action) {
    try {
        const res = yield call(Api.addProject, action.project);
        yield console.log(res)
        yield put({
            type: TYPES.ADD_PROJECT,
            payload: {
                ...action.project,
                ...setOwnerHelper(res.data)
            }
        })
        yield put({
            type: TYPES.SHOW_ALERT,
            payload: { text: 'Проект был создан!', type: 'success' }
        })
    } catch (e) {
        console.log(e)
        yield put({ type: TYPES.SHOW_ALERT, payload: { text: 'Возникла ошибка при добавлении нового проекта', type: 'danger' } })
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
            // yield put({ type: TYPES.SHOW_ALERT, payload: { text: 'Проект успешно удален', type: 'success' } })
        }
    } catch (e) {
        console.log(e)
        yield put({ type: TYPES.SHOW_ALERT, payload: { text: 'Возникла ошибка при удалении проекта', type: 'danger' } })
    }
}

export function* updateProjectSaga(action) {
    try {
        const res = yield call(Api.updateProject, action.project);
        if (res.status === 200) {
            yield put({
                type: TYPES.CHANGE_SETTINGS,
                project: { ...action.project }
            })
        }
    } catch (e) {
        console.log(e)
        yield put({ type: TYPES.SHOW_ALERT, payload: { text: 'Возникла ошибка при изменении проекта', type: 'danger' } })
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
        yield put({ type: TYPES.SHOW_ALERT, payload: { text: 'Возникла ошибка при добавлении пользователя', type: 'danger' } })
    }
}

function setOwnerHelper(project) {
    // set field "isOwner" for current user
    const strogeToken = localStorage.getItem('auth-token')
    let isOwner = false
    if (strogeToken) {
        isOwner = project.owner.id === jwt_decode(strogeToken).userID
    }
    return { ...project, isOwner }
}