import { call, put } from 'redux-saga/effects';
import jwt_decode from 'jwt-decode';
import { Api } from '../api/api';
import TYPES from '../actions/actionTypes';


export function* fetchProjectsSaga() {
    try{
        yield put({ type: TYPES.CHANGE_LOADER, payload: { loading: true } })
        const res = yield call(Api.getAllProjects)
        let payload = []
        if (res.data) {
            payload = res.data.map(project => setOwnerHelper(project))
        }
        yield put({ type: TYPES.FETCH_PROJECT, payload })
        yield put({ type: TYPES.CHANGE_LOADER, payload: { loading: false } })
    } catch (error) {
        console.log(error)
        yield put({type: TYPES.REQUEST_ERROR, payload: { text: 'Возникла ошибка при загрузки проектов', type: 'error' }})
    }
    
}

export function* addProjectSaga(action) {
    try {
        const res = yield call(Api.addProject, action.payload) // project
        yield put({
            type: TYPES.ADD_PROJECT,
            payload: {
                ...action.payload,
                ...setOwnerHelper(res.data)
            }
        })
        yield put({
            type: TYPES.SHOW_ALERT,
            payload: { text: 'Проект был создан!', type: 'success' }
        })
    } catch (e) {
        console.log(e.response.status)
        yield put({ type: TYPES.SHOW_ALERT, payload: { text: 'Возникла ошибка при добавлении нового проекта', type: 'error' } })
    }
}
export function* removeProjectSaga(action) {
    try {
        const res = yield call(Api.removeProject, action.payload) // projectID
        if (res.status === 200) {
            yield put({
                type: TYPES.REMOVE_PROJECT,
                payload: action.payload
            })
            yield put({ type: TYPES.SHOW_ALERT, payload: { text: 'Проект успешно удален', type: 'success' } })
        }
    } catch (e) {
        console.log(e)
        yield put({ type: TYPES.SHOW_ALERT, payload: { text: 'Возникла ошибка при удалении проекта', type: 'error' } })
    }
}

export function* updateProjectSaga(action) {
    try {
        const res = yield call(Api.updateProject, action.payload) // project
        if (res.status === 200) {
            yield put({
                type: TYPES.CHANGE_SETTINGS,
                payload: {...action.payload}
            })
            yield put({ type: TYPES.SHOW_ALERT, payload: { text: 'Проект успешно обновлен', type: 'success' } })
        }
    } catch (e) {
        console.log(e)
        yield put({ type: TYPES.SHOW_ALERT, payload: { text: 'Возникла ошибка при изменении проекта', type: 'error' } })
    }
}
// export function* addUserToProjectSaga(action) {
//     try {
//         const res = yield call(Api.addUserToProject, action.payload.project, action.payload.userID)
//         if (res.status === 200) {
//             yield put({
//                 type: TYPES.SUCC_ADDING,
//                 payload: action.payload
//             })
//         }
//     } catch (e) {
//         console.log(e)
//         yield put({ type: TYPES.SHOW_ALERT, payload: { text: 'Возникла ошибка при добавлении пользователя', type: 'error' } })
//     }
// }

function setOwnerHelper(project) {
    // set field "isOwner" for current user
    const strogeToken = localStorage.getItem('auth-token')
    let isOwner = false
    if (strogeToken) {
        isOwner = project.owner.id === jwt_decode(strogeToken).userID
    }
    return { ...project, isOwner }
}