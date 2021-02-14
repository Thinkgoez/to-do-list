import axios from 'axios'
const URL = 'http://localhost:5000'

const instance = axios.create({
    baseURL: URL,
    headers: {
        'Authorization': localStorage.getItem('auth-token') || ''
    }
})

export const Api = {
    getNotesByProjectID(projectID) {
        return instance.get(`/tasks/${projectID}`)
    },
    addNote(task, projectID) {
        return instance.post(`/tasks/${projectID}`, task)
    },
    removeNote(taskID) {
        return instance.delete(`/tasks/${taskID}`)
    },
    // updateNote(task, projectID) {
    //     return axios.patch(`${URL}/tasks/${projectID}/${task.id}`, { ...task, completed: !task.completed })
    // },
    updateNote(task, projectID) {
        return instance.patch(`/tasks/${projectID}/${task.id}`, task)
    },

    // ****** project API
    getAllProjects() {
        return instance.get(`/projects`)
    },
    getProject(id) {
        return instance.get(`/projects/${id}`)
    },
    addProject(project) {
        return instance.post(`/projects`, project)
    },
    removeProject(projectID) {
        return instance.delete(`/projects/${projectID}`)
    },
    // addUserToProject(project, userID) {
    //     return axios.patch(`${URL}/projects/${project.id}/.json`, { ...project, followingUsers: [...project.followingUsers, userID] })
    // },
    updateProject(project) {
        return instance.patch(`/projects/${project.id}`, project)
    },
    // updateSettings(project, payload) {
    //     return axios.patch(`${URL}/projects/${project.id}`, { ...project, ...payload })
    // },

    login(userData){
        return instance.post(`/auth/login`, userData)
    },
    register(userData){
        return instance.post(`/auth/register`, userData)
    }
}