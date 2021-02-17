import TYPES from '../types';

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

export const show = (text, type = 'warning') => ({
    type: TYPES.SHOW_ALERT,
    payload: { text, type }
})

export const hide = () => ({ type: TYPES.HIDE_ALERT })