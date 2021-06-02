// not working file

import TYPES from '../actions/actionTypes';

const initialState = {
    token: null,
    isAuth: false,
    error: null

}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.SET_TOKEN:
            return { ...state, ...action.payload }
        case TYPES.LOGOUT_SUCCESS:
            return { ...state, token: null, isAuth: false, error: null }
        case TYPES.LOGIN_SUCCESS:
            return { ...state, ...action.payload, error: null }
        case TYPES.LOGIN_ERROR:
            return { ...state, ...action.payload, isAuth: false}
        default:
            return state;
    }
}
