import TYPES from '../actions/actionTypes';


const initialState = {
    projects: [],
    currentProject: {},
}

export const projectsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.ADD_PROJECT:
            return {
                ...state,
                projects: [...state.projects, { ...action.payload }]
            }
        case TYPES.FETCH_PROJECT:
            return { ...state, projects: action.payload }
        case TYPES.REMOVE_PROJECT:
            return {
                ...state,
                projects: state.projects.filter(project => project._id !== action.payload),
                currentProject: {}
            }
        case TYPES.SET_CURRENT_PROJECT:
            return {
                ...state,
                currentProject: state.projects.find(proj => proj._id === action.payload),
            }
        case TYPES.CHANGE_SETTINGS:
            return {
                ...state,
                projects: state.projects.map(project => { if (project._id === action.project._id) return action.project; return project }),
                currentProject: action.project
            }
        case TYPES.CLEAR_DATA:
            return {
                ...state,
                projects: [],
                currentProject: {},
            }
        default:
            return state;
    }
}