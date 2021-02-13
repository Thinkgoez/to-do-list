import { call, put } from 'redux-saga/effects';
import { Api } from '../../api/api';
import TYPES from '../types';

export function* loginSaga(action){
    yield put({ type: TYPES.CHANGE_LOADER, payload: { loading: true } })
    const res = yield call(Api.login, action.userData)
    // yield console.log(res)
    const token = res.data.token
    yield localStorage.setItem('auth-token', token)
    yield put({ type: TYPES.SET_TOKEN, token })
    yield put({ type: TYPES.CHANGE_LOADER, payload: { loading: false } })
}
export function* registerSaga(action){
    yield put({ type: TYPES.CHANGE_LOADER, payload: { loading: true } })
    const res = yield call(Api.register, action.userData)
    yield console.log(res)
    yield put({ type: TYPES.CHANGE_LOADER, payload: { loading: false } })
}
export function* logoutSaga(){
    // yield put({ type: TYPES.CHANGE_LOADER, payload: { loading: true } })
    // const res = yield call(Api.register, action.userData)
    yield console.log('eeeeee')
    yield localStorage.removeItem('auth-token')
    yield put({type: TYPES.LOGOUT_SUCCESS})
    // yield console.log(res)
    // yield put({ type: TYPES.CHANGE_LOADER, payload: { loading: false } })
}