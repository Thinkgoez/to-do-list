import TYPES from '../actions/actionTypes';

const initialState = {
    loading: false,
    error: null // {errorMessage: text, errorCode: number, } || error
}

export const optionReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.REQUEST_ERROR:
            return { ...state, error: action.errorMessage }
        case TYPES.CHANGE_LOADER:
            return { ...state, ...action.payload }
        default:
            return state
    }
}

// export const showLoader = () => ({ type: TYPES.CHANGE_LOADER, payload: { loading: true } })
