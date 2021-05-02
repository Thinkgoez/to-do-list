import TYPES from '../actions/actionTypes';

const initialState = {
    token: null,
    isAuth: false
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.SET_TOKEN:
            return { ...state, ...action.payload }
        case TYPES.LOGOUT_SUCCESS:
            return { ...state, token: null, isAuth: false }
        case TYPES.LOGIN_SUCCESS:
            return { ...state, ...action.payload }
        default:
            return state;
    }
}
