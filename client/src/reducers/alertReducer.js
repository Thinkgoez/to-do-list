import TYPES from '../actions/actionTypes';

const initialState = {
    visible: false,
    type: '',
    text: '' ,
}

export const alertReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.SHOW_ALERT:
            return { ...action.payload, visible: true }
        case TYPES.HIDE_ALERT:
            return { ...state, visible: false }
        default:
            return state
    }
}