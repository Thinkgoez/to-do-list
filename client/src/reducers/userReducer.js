import TYPES from '../actions/actionTypes';


const initialState = {
    isFetching: true,
    error: null,
    token: null,
    isAuth: false,
    // data
};

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case TYPES.SET_TOKEN:
            return { ...state, ...action.payload }
        case TYPES.LOGOUT_SUCCESS:
            return { ...state, token: null, isAuth: false, error: null }
        case TYPES.LOGIN_SUCCESS:
            return { ...state, ...action.payload }

        case TYPES.GET_USER_ERROR: {
            return {
                ...state,
                isFetching: false,
                error: action.error,
                isAuth: false,
            }
        }
        case TYPES.GET_USER_SUCCESS: {
            return {
                ...state,
                isFetching: false,
                error: null,
                // data: action.data,
                isAuth: true,
            }
        }
        case TYPES.CHANGE_PASS_SUCCESS: {
            return {
                ...state,
                error: null
            }
        }
        case TYPES.CHANGE_PASS_ERROR: {
            return {
                ...state,
                error: action.error
            }
        }
        case TYPES.GET_USER_REQUEST: {
            return {
                ...state,
                isFetching: true,
                error: null,
                isAuth: false,
            }
        }
        case TYPES.CLEAR_USER_STORE: {
            return {
                ...state,
                error: null,
                isAuth: false,
            }
        }
        case TYPES.UPDATE_USER_DATA_SUCCESS: {
            return {
                ...state,
                // data: { ...state.data, ...action.data },
                error: null
            }
        }
        case TYPES.UPDATE_USER_DATA_ERROR: {
            return {
                ...state,
                error: action.error
            }
        }
        case TYPES.CLEAR_USER_ERROR: {
            return {
                ...state,
                error: null
            }
        }
        default:
            return state;
    }
}