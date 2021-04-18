import { call, put } from 'redux-saga/effects';
import { Api } from '../../api/api';
import TYPES from '../types';

export function* loginSaga(action) {
    try {
        yield put({ type: TYPES.CHANGE_LOADER, payload: { loading: true } })
        const res = yield call(Api.login, action.userData)
        const token = res.data.token
        yield localStorage.setItem('auth-token', token)
        yield put({ type: TYPES.LOGIN_SUCCESS, payload: { token, isAuth: true } })
        yield put({ type: TYPES.CHANGE_LOADER, payload: { loading: false } })
    } catch (error) {
        console.log(error)
        yield put({ type: TYPES.SHOW_ALERT, payload: { text: 'Ошибка авторизации', type: 'danger' } })
    }
}

export function* getProfileSaga() {
    try {
        yield put({ type: TYPES.CHANGE_LOADER, payload: { loading: true } })
        const token = localStorage.getItem('auth-token')
        if (token) {
            yield call(Api.getProfile, token)
            yield put({ type: TYPES.LOGIN_SUCCESS, payload: { token, isAuth: true } })
        }
        yield put({ type: TYPES.CHANGE_LOADER, payload: { loading: false } })
    } catch (error) {
        console.log(error)
        localStorage.removeItem("auth-token")
    }

}
export function* registerSaga(action) {
    try {
        yield put({ type: TYPES.CHANGE_LOADER, payload: { loading: true } })
        const res = yield call(Api.register, action.userData)
        if(res.status === 201){ // 201?
            yield put({ type: TYPES.SHOW_ALERT, payload: { text: 'Успешная регистрация', type: 'success' } })
            yield put({ type: TYPES.REQUEST_LOGIN_USER, userData: action.userData })
        }
        yield put({ type: TYPES.CHANGE_LOADER, payload: { loading: false } })
    } catch (error) {
        console.log(error)
        yield put({ type: TYPES.SHOW_ALERT, payload: { text: 'Ошибка при регистрации', type: 'danger' } })
    }

}
export function* logoutSaga() {
    try {
        yield localStorage.removeItem('auth-token')
        yield put({ type: TYPES.LOGOUT_SUCCESS })
    } catch (error) {
        console.log(error)
        yield put({ type: TYPES.SHOW_ALERT, payload: { text: 'Возникла ошибка при выходе', type: 'danger' } })
    }

}