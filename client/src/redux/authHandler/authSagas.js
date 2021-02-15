import { call, put } from 'redux-saga/effects';
import { Api } from '../../api/api';
import TYPES from '../types';

export function* loginSaga(action){
    try{
        yield put({ type: TYPES.CHANGE_LOADER, payload: { loading: true } })
        const res = yield call(Api.login, action.userData)
        // yield console.log(res)
        const token = res.data.token
        yield localStorage.setItem('auth-token', token)
        yield put({ type: TYPES.SET_TOKEN, token })
        yield put({ type: TYPES.CHANGE_LOADER, payload: { loading: false } })
    } catch(error) {
        console.log(error)
        yield put({ type: TYPES.SHOW_ALERT, payload: { text: 'Ошибка авторизации', type: 'danger' } })
    }
    
}
export function* registerSaga(action){
    try{
        yield put({ type: TYPES.CHANGE_LOADER, payload: { loading: true } })
        const res = yield call(Api.register, action.userData)
        yield console.log(res)
        yield put({ type: TYPES.CHANGE_LOADER, payload: { loading: false } })
    } catch(error){
        console.log(error)
        yield put({ type: TYPES.SHOW_ALERT, payload: { text: 'Ошибка при регистрации', type: 'danger' } })
    }
   
}
export function* logoutSaga(){
    try{
        yield localStorage.removeItem('auth-token')
        yield put({type: TYPES.LOGOUT_SUCCESS})
    } catch(error){
        console.log(error)
        yield put({ type: TYPES.SHOW_ALERT, payload: { text: 'Возникла ошибка при выходе', type: 'danger' } })
    }
   
}