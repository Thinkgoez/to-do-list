import TYPES from './notesTypes';

const initialState = {
    notes: [],
    loading: false,
}

export const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.ADD_NOTE:
            return {
                ...state,
                notes: [...state.notes, action.payload.note]
            }
        case TYPES.FETCH_NOTES:
            return { ...state, notes: action.payload.notes }

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

export const showLoader = () => ({ type: TYPES.CHANGE_LOADER, payload: { loading: true } })
export const fetchNotes = (projectID) => ({ type: TYPES.REQUEST_NOTES, projectID })
export const removeNote = (projectID, noteID) => ({ type: TYPES.REQUEST_REMOVE_NOTE, projectID, noteID })
export const addNote = (title, projectID) => ({ type: TYPES.REQUEST_ADD_NOTE, note: { title, date: new Date().toJSON(), completed: false }, projectID })
export const onChangeCompleteNote = (note, projectID) => ({ type: TYPES.REQUEST_COMPLETE_NOTE, note, projectID })