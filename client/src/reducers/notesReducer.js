import TYPES from '../actions/actionTypes';

const initialState = {
    notes: [],
}

export const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.ADD_NOTE:
            return {
                ...state,
                notes: [...state.notes, action.payload]
            }
        case TYPES.FETCH_NOTES:
            return { ...state, notes: action.payload }

        case TYPES.REMOVE_NOTE:
            return {
                ...state,
                notes: state.notes.filter(note => note._id !== action.payload)
            }
        case TYPES.COMPLETE_NOTE:
            return {
                ...state,
                notes: state.notes.map(note => { if (note._id === action.note._id) note.completed = !note.completed; return note })
            }
        default:
            return state;
    }
}