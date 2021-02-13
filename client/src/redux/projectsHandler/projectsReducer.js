import TYPES from '../types';


const initialState = {
    notes: [],
    projects: [],
    currentProject: {},
    userID: null
}

export const projectsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.ADD_NOTE:
            return {
                ...state,
                notes: [...state.notes, action.payload]
            }
        case TYPES.ADD_PROJECT:
            return {
                ...state,
                projects: [...state.projects, { ...action.payload }]
            }
        case TYPES.FETCH_NOTES:
            return { ...state, notes: action.payload }
        case TYPES.FETCH_PROJECT:
            return { ...state, projects: action.payload }
        case TYPES.REMOVE_NOTE:
            return {
                ...state,
                notes: state.notes.filter(note => note.id !== action.payload)
            }
        case TYPES.REMOVE_PROJECT:
            return {
                ...state,
                projects: state.projects.filter(project => project.id !== action.payload),
                currentProject: {}
            }
        case TYPES.COMPLETE_NOTE:
            return {
                ...state,
                notes: state.notes.map(note => { if (note.id === action.payload) note.completed = !note.completed; return note })
            }
        case TYPES.SET_CURRENT_PROJECT:
            return {
                ...state,
                currentProject: state.projects.find(proj => proj.id === action.projectID),
            }
        case TYPES.CHANGE_SETTINGS:
            return {
                ...state,
                projects: state.projects.map(project => { if (project.id === action.project.id) return action.project; return project }),
                currentProject: action.project
            }
        case TYPES.CLEAR_DATA:
            return {
                ...state,
                notes: [],
                projects: [],
                currentProject: {},
                userID: null
            }
        case TYPES.SET_USER_ID:
            return { ...state, ...action.payload }
        default:
            return state;
    }
}


export const fetchProjects = (userID) => ({ type: TYPES.REQUEST_PROJECTS, userID })
export const addProject = (title, description, userID) => ({ type: TYPES.REQUEST_ADD_PROJECT, project: { title, date: new Date().toJSON(), description, followingUsers: [userID], owner: userID } })
export const removeProject = (projectID) => ({ type: TYPES.REQUEST_REMOVE_PROJECT, projectID })
export const setCurrentProject = (projectID) => ({ type: TYPES.SET_CURRENT_PROJECT, projectID })
export const addUserToProject = (project, userID) => ({ type: TYPES.ADD_USER_TO, project, userID })
export const setNewSettings = (project, title) => ({ type: TYPES.REQUEST_UPDATE_SETTINGS, project, payload: { title } })

export const clearData = () => ({ type: TYPES.CLEAR_DATA })





