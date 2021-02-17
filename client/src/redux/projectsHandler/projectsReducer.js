import TYPES from '../types';


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
                currentProject: state.projects.find(proj => proj._id === action.projectID),
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


export const fetchProjects = () => ({ type: TYPES.REQUEST_PROJECTS})
export const addProject = (project) => ({ type: TYPES.REQUEST_ADD_PROJECT, project }) // followingUsers: [userID]
export const removeProject = (projectID) => ({ type: TYPES.REQUEST_REMOVE_PROJECT, projectID })
export const setCurrentProject = (projectID) => ({ type: TYPES.SET_CURRENT_PROJECT, projectID })
export const addUserToProject = (project, userID) => ({ type: TYPES.ADD_USER_TO, project, userID })
export const updateProject = (project) => ({ type: TYPES.REQUEST_UPDATE_PROJECT, project})

export const clearData = () => ({ type: TYPES.CLEAR_DATA })





