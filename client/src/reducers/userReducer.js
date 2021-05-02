import TYPES from '../actions/actionTypes';


const initialState = {
    isFetching: true,
    error: null,
    data: null
};

export function userReducer (state = initialState, action) {
    switch (action.type) {
        case TYPES.CHANGE_PASS_SUCCESS:{
            return{
                ...state,
                error: null
            }
        }
        case TYPES.CHANGE_PASS_ERROR:{
            return{
                ...state,
                error: action.error
            }
        }


        case TYPES.GET_USER_REQUEST: {
            return {
                ...state,
                isFetching: true,
                error: null,
                data: null
            }
        }
        case TYPES.GET_USER_SUCCESS: {
            return {
                ...state,
                isFetching: false,
                error: null,
                data: action.data
            }
        }
        case TYPES.GET_USER_ERROR: {
            return {
                ...state,
                isFetching: false,
                error: action.error,
                data: null
            }
        }
        case TYPES.CLEAR_USER_STORE:{
            return{
                ...state,
                data: null,
                error: null
            }
        }
        case TYPES.UPDATE_USER_DATA_SUCCESS:{
            return{
                ...state,
                data: {...state.data,...action.data},
                error: null
            }
        }
        case TYPES.UPDATE_USER_DATA_ERROR:{
            return{
                ...state,
                error: action.error
            }
        }
        case TYPES.CLEAR_USER_ERROR:{
            return{
                ...state,
                error: null
            }
        }
        default:
            return state;
    }
}