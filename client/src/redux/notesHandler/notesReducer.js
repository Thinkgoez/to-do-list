import TYPES from '../types';

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
                notes: state.notes.map(note => { if (note._id === action.payload) note.completed = !note.completed; return note })
            }
        default:
            return state;
    }
}

export const fetchNotes = (projectID) => ({ type: TYPES.REQUEST_NOTES, projectID })
export const removeNote = (noteID) => ({ type: TYPES.REQUEST_REMOVE_NOTE, noteID })
export const addNote = (title, projectID) => ({ type: TYPES.REQUEST_ADD_NOTE, note: { title, date: new Date().toJSON(), completed: false }, projectID })
export const onChangeCompleteNote = (projectID, note) => ({ type: TYPES.REQUEST_COMPLETE_NOTE, note, projectID })