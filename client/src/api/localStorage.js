// localStorage.getItem('auth-token') || ''

// localStorage['auth-token']

export const authTokenStorage = () => {
    let currentStorage = localStorage.getItem('auth-token')


    return {
        getToken(){
            return currentStorage
        },
        setToken(newToken){
            currentStorage = newToken
            localStorage.setItem('auth-token', newToken)
        },
        clearToken(){
            currentStorage = null
            localStorage.removeItem('auth-token')
        }
    }
}
