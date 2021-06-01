import axios from 'axios'
const URL = process.env.SERVER_URL || 'http://localhost:5000'
console.log(process.env)

// console.log(localStorage['auth-token'])

const instance = axios.create({ baseURL: URL })

instance.interceptors.request.use(config => {
    const token = window.localStorage.getItem('auth-token');
    if (token) {
        config.headers = { ...config.headers, 'Authorization': token };
    }
    return config;
}, (err) => Promise.reject(err));


instance.interceptors.response.use(response => {
    if (response.data.token) {
        // console.log('token', response.data.token)
        window.localStorage.setItem('auth-token', response.data.token);
    }
    return response;
}, err => {
    // if (err.response.status === 408 && history.location.pathname !== '/login' && history.location.pathname !== '/registration' && history.location.pathname !== '/') {
    //     // history.replace('/login');
    // }
    return Promise.reject(err);
});


//**************************************************         ROUTES
export const Api = {
    getNotesByProjectID(projectID) {
        return instance.get(`/tasks/${projectID}`)
    },
    addNote(task, projectID) {
        return instance.post(`/tasks/${projectID}`, task, {
            // headers: {
            //     'Authorization': localStorage.getItem('auth-token') || ''
            // }
        })
    },
    removeNote(taskID) {
        return instance.delete(`/tasks/${taskID}`)
    },
    updateNote(task) {
        return instance.patch(`/tasks/${task._id}`, task)
    },

    // *************************************************************** project API
    getAllProjects() {
        return instance.get(`/projects`, {
            // headers: {
            //     'Authorization': localStorage.getItem('auth-token') || ''
            // }
        })
    },
    getProject(id) {
        return instance.get(`/projects/${id}`)
    },
    addProject(project) {
        return instance.post(`/projects`, project, {
            // headers: {
            //     'Authorization': localStorage.getItem('auth-token') || ''
            // }
        })
    },
    removeProject(projectID) {
        return instance.delete(`/projects/${projectID}`)
    },
    updateProject(project) {
        return instance.patch(`/projects/${project._id}`, project)
    },

    // *********************************************************************** user(auth) API
    getProfile(token) {
        return instance.get('/auth/profile',
            // {
            //     headers: { 'Authorization': token }
            // }
        )
    },
    login(userData) {
        return instance.post(`/auth/login`, userData)
    },
    register(userData) {
        return instance.post(`/auth/register`, userData)
    },
    getUser() {
        return instance.post('/auth/getUser')
    }
}