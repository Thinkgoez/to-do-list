import { call, put } from 'redux-saga/effects';
import { Api } from '../api/api';
import TYPES from '../actions/actionTypes';

export function* loginSaga(action) {
    try {
        yield put({ type: TYPES.CHANGE_LOADER, payload: { loading: true } })
        const res = yield call(Api.login, action.payload)
        const token = res.data.token
        yield localStorage.setItem('auth-token', token)
        yield put({ type: TYPES.LOGIN_SUCCESS, payload: { token, isAuth: true } })
    } catch (error) {
        // yield put({ type: TYPES.LOGIN_ERROR, payload: { error: { text: 'Неверный логин или пароль' } } })
        yield put({ type: TYPES.SHOW_ALERT, payload: { text: 'Ошибка при логинизации', type: 'error' } })
    } finally {
        yield put({ type: TYPES.CHANGE_LOADER, payload: { loading: false } })
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
        localStorage.removeItem("auth-token")
    }

}
export function* registerSaga(action) {
    try {
        yield put({ type: TYPES.CHANGE_LOADER, payload: { loading: true } })
        const res = yield call(Api.register, action.payload)
        if (res.status === 201) { // 201?
            yield put({ type: TYPES.SHOW_ALERT, payload: { text: 'Успешная регистрация', type: 'success' } })
            yield put({ type: TYPES.REQUEST_LOGIN_USER, payload: action.payload })
        }
        yield put({ type: TYPES.CHANGE_LOADER, payload: { loading: false } })
    } catch (error) {
        yield put({ type: TYPES.SHOW_ALERT, payload: { text: 'Ошибка при регистрации', type: 'error' } })
    }

}
export function* logoutSaga() {
    try {
        yield localStorage.removeItem('auth-token')
        yield put({ type: TYPES.LOGOUT_SUCCESS })
    } catch (error) {
        yield put({ type: TYPES.SHOW_ALERT, payload: { text: 'Возникла ошибка при выходе', type: 'error' } })
    }

}