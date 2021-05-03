import { put } from 'redux-saga/effects';
import { Api } from '../api/api';
// import * as restController from '../api/rest/restController';
// import { controller } from '../api/ws/socketController';
import TYPES from '../actions/actionTypes';

export function* getAllUsers(action) {
    // try {
    //     const { data } = yield restController.getAllUsers(action.payload);
    //     yield put({ type: TYPES.GET_ALL_USERS_SUCCESS, data });
    // }
    // catch (e) {
    //     yield put({ type: TYPES.GET_ALL_USERS_ERROR, error: e.response });
    // }
}


export function* recoverySaga(action) {
    // try {
    //     const { data } = yield restController.recoverysRequest(action.payload);
    //     yield put({ type: TYPES.CHANGE_PASS_SUCCESS });
    // }
    // catch (e) {
    //     yield put({ type: TYPES.CHANGE_PASS_ERROR, error: e.response });
    // }
}

export function* updatePassSaga(action) {
    // try {
    //     const { data } = yield restController.updatePassRequest(action.payload);
    //     yield put({ type: TYPES.CHANGE_PASS_SUCCESS });
    // }
    // catch (e) {
    //     yield put({ type: TYPES.CHANGE_PASS_ERROR, error: e.response });
    // }
}

export function* privateSaga(action) {
    // yield put({ type: TYPES.GET_USER_REQUEST });
    try {
        yield Api.getUser(action.payload) // {data}
        yield put({ type: TYPES.GET_USER_SUCCESS })
        // controller.subscribe(data.id);
    }
    catch (e) {
        yield put({ type: TYPES.GET_USER_ERROR, error: e.response })
        if (typeof action.payload === 'function') {
            yield action.payload()
        }

    }
}


export function* notAuthorizeSaga(action) { // ONLY_FOR_NOT_AUTHORIZE_USERS
    // yield put({ type: TYPES.GET_USER_REQUEST });
    // try {
    //     const { data } = yield restController.getUser();
    //     action.replace('/');
    //     yield put({ type: TYPES.GET_USER_SUCCESS, data: data });

    // }
    // catch (e) {
    //     yield put({ type: TYPES.GET_USER_ERROR, error: e });
    // }

}


export function* updateUserData(action) {
    // try {
    //     const { data } = yield restController.updateUser(action.payload);
    //     yield put({ type: TYPES.UPDATE_USER_DATA_SUCCESS, data: data });
    //     yield put({ type: TYPES.CHANGE_EDIT_MODE_ON_USER_PROFILE, data: false });
    // }
    // catch (e) {
    //     yield put({ type: TYPES.UPDATE_USER_DATA_ERROR, error: e.response });
    // }
}

export function* headerRequest() {
    // yield put({ type: TYPES.GET_USER_REQUEST });
    // try {
    //     const { data } = yield restController.getUser();
    //     yield put({ type: TYPES.GET_USER_SUCCESS, data: data });
    //     controller.subscribe(data.id);
    // }
    // catch (e) {
    //     yield put({ type: TYPES.GET_USER_ERROR, error: e.response });
    // }
}