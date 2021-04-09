import axios from 'axios'
const URL = 'http://localhost:5000'

// console.log(localStorage['auth-token'])

const instance = axios.create({
    baseURL: URL,
    // headers: {
    //     'Authorization': localStorage.getItem('auth-token') || ''
    // }
})

export const Api = {
    getNotesByProjectID(projectID) {
        return instance.get(`/tasks/${projectID}`)
    },
    addNote(task, projectID) {
        return instance.post(`/tasks/${projectID}`, task, {
            headers: {
                'Authorization': localStorage.getItem('auth-token') || ''
            }
        })
    },
    removeNote(taskID) {
        return instance.delete(`/tasks/${taskID}`)
    },
    // updateNote(task, projectID) {
    //     return axios.patch(`${URL}/tasks/${projectID}/${task._id}`, { ...task, completed: !task.completed })
    // },
    updateNote(task) {
        return instance.patch(`/tasks/${task._id}`, task)
    },

    // ****** project API
    getAllProjects() {
        return instance.get(`/projects`)
    },
    getProject(id) {
        return instance.get(`/projects/${id}`)
    },
    addProject(project) {
        return instance.post(`/projects`, project, {
            headers: {
                'Authorization': localStorage.getItem('auth-token') || ''
            }
        })
    },
    removeProject(projectID) {
        return instance.delete(`/projects/${projectID}`)
    },
    updateProject(project) {
        return instance.patch(`/projects/${project._id}`, project)
    },

    // ****** project API
    getProfile(token) {
        return instance.get('http://localhost:5000/auth/profile', {
            headers: { 'Authorization': token }
        })
    },
    login(userData) {
        return instance.post(`/auth/login`, userData)
    },
    register(userData) {
        return instance.post(`/auth/register`, userData)
    }
}