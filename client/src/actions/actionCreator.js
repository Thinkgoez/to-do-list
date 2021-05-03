import TYPES from './actionTypes';

//                          ALERT
export const show = (text, type = 'warning') => ({ type: TYPES.SHOW_ALERT, payload: { text, type } })
export const hide = () => ({ type: TYPES.HIDE_ALERT })

//                          AUTH
export const setToken = (token) => ({ type: TYPES.SET_TOKEN, payload: token })
export const logout = () => ({ type: TYPES.REQUEST_LOGOUT })
export const createUser = (userData) => ({ type: TYPES.REQUEST_CREATE_USER, payload: userData })
export const login = (email, password) => ({ type: TYPES.REQUEST_LOGIN_USER, payload: { email, password } })
export const getProfileFetch = () => ({ type: TYPES.REQUEST_PROFILE })

//                          NOTES
export const fetchNotes = (payload) => ({ type: TYPES.REQUEST_NOTES, payload })
export const removeNote = (payload) => ({ type: TYPES.REQUEST_REMOVE_NOTE, payload })
export const addNote = (title, projectID) => ({
    type: TYPES.REQUEST_ADD_NOTE,
    payload: {
        note: {
            title, date: new Date().toJSON(),
            completed: false
        },
        projectID
    }
})
export const onChangeCompleteNote = (payload) => ({ type: TYPES.REQUEST_COMPLETE_NOTE, payload })

//                          PROJECT
export const fetchProjects = () => ({ type: TYPES.REQUEST_PROJECTS })
export const addProject = (payload) => ({ type: TYPES.REQUEST_ADD_PROJECT, payload })
export const removeProject = (payload) => ({ type: TYPES.REQUEST_REMOVE_PROJECT, payload })
export const setCurrentProject = (projectID) => ({ type: TYPES.SET_CURRENT_PROJECT, payload: projectID })
export const addUserToProject = (project, userID) => ({ type: TYPES.ADD_USER_TO, payload: { project, userID } })
export const updateProject = (payload) => ({ type: TYPES.REQUEST_UPDATE_PROJECT, payload })

export const clearData = () => ({ type: TYPES.CLEAR_DATA })


//                          USER
export const getAllUsers = (payload) => ({ type: TYPES.GET_ALL_USERS, payload })
export const updatePass = (payload) => ({ type: TYPES.ACTION_UPDATE_PASS, payload })
export const authActionPassRecovery = (payload) => ({ type: TYPES.AUTH_ACTION_PASS_RECOVERY, payload })
export const getUserAction = (payload) => ({ type: TYPES.GET_USER_ACTION, payload })
export const updateUserData = (payload) => ({ type: TYPES.UPDATE_USER_DATA, payload })
export const onlyForNotAuthorize = (payload) => ({ type: TYPES.ONLY_FOR_NOT_AUTHORIZE_USERS, payload })
export const headerRequest = (payload) => ({ type: TYPES.HEADER_REQUEST_AUTHORIZE, payload })
export const clearUserStore = () => ({ type: TYPES.CLEAR_USER_STORE })
export const clearUserError = () => ({ type: TYPES.CLEAR_USER_ERROR })