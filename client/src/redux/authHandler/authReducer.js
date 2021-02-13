import TYPES from '../types';

const initialState = {
    token: null,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.SET_TOKEN:
            return { ...state, token: action.token }
        case TYPES.LOGOUT_SUCCESS:
            return { ...state, token: null }
        default:
            return state;
    }
}

export const setToken = (token) => ({ type: TYPES.SET_TOKEN, token })
export const logout = () => ({ type: TYPES.REQUEST_LOGOUT })
export const createUser = (userData) => ({ type: TYPES.REQUEST_CREATE_USER, userData })
export const login = (email, password) => ({ type: TYPES.REQUEST_LOGIN_USER, userData: { email, password } })