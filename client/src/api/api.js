import axios from 'axios'
const URL = "http://localhost:5000"

export const Api = {
    getNotesByProjectID(projectID) {
        return axios.get(`${URL}/tasks/${projectID}`)
    },
    addNote(task, projectID) {
        return axios.post(`${URL}/tasks/${projectID}`, task)
    },
    removeNote(propjectID, taskID) {
        return axios.delete(`${URL}/tasks/${propjectID}/${taskID}`)
    },
    // updateNote(task, projectID) {
    //     return axios.patch(`${URL}/tasks/${projectID}/${task.id}`, { ...task, completed: !task.completed })
    // },
    updateNote(task, projectID) {
        return axios.patch(`${URL}/tasks/${projectID}/${task.id}`, task)
    },

    // ****** project API
    getAllProjects() {
        return axios.get(`${URL}/projects`)
    },
    getProject(id) {
        return axios.get(`${URL}/projects/${id}`)
    },
    addProject(project) {
        return axios.post(`${URL}/projects`, project)
    },
    removeProject(projectID) {
        return axios.delete(`${URL}/projects/${projectID}`)
    },
    // addUserToProject(project, userID) {
    //     return axios.patch(`${URL}/projects/${project.id}/.json`, { ...project, followingUsers: [...project.followingUsers, userID] })
    // },
    updateProject(project) {
        return axios.patch(`${URL}/projects/${project.id}`, project)
    },
    // updateSettings(project, payload) {
    //     return axios.patch(`${URL}/projects/${project.id}`, { ...project, ...payload })
    // },

    login(userData){
        return axios.post(`${URL}/auth/login`, userData)
    },
    register(userData){
        return axios.post(`${URL}/auth/register`, userData)
    }
}