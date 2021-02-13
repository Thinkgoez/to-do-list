import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Alert from './components/Alert';
import { Navbar } from './components/Navbar';

import Home from './pages/Home';
import { About } from './pages/About';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import ProjectInfo from './pages/Project/ProjectInfo';
import UserInfo from './pages/auth/UserInfo';
import ProjectSettings from './pages/Project/ProjectSettings';

import { clearData } from './redux/projectsHandler/projectsReducer';
import { setToken, logout } from './redux/authHandler/authReducer';

// console.log(localStorage.getItem('auth-token'))

const App = ({ logout, setToken, ...props }) => {
    useEffect(() => {
        const token = localStorage.getItem('auth-token')
        if (token && !props.token) {
            setToken(token)
        } else if (!token) {
            setToken(null)
        }
        // return () => {
        //     setToken(null)
        // };
    }, [props.token, setToken])

    const handleLogout = async () => {
        clearData()
        await logout()
    }

    return (
        <BrowserRouter>
            <Navbar token={props.token} logout={handleLogout} />
            <div className="container pt-4">
                <Alert />
                <Switch>
                    <Route path={'/'} exact component={() => <Home />} />
                    <Route path={'/about'} component={About} />
                    <Route path={'/register'} component={() => <Register />} />
                    <Route path={'/login'} component={() => <Login />} />
                    <Route path={'/UserInfo'} component={() => <UserInfo {...props} />} />
                    <Route path={'/projects/settings/:projectTitle'} component={() => <ProjectSettings {...props} />} />
                    <Route path={'/projects/:projectTitle?'} component={() => <ProjectInfo />} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

App.propTypes = {
    user: PropTypes.string,
    error: PropTypes.string,
    setToken: PropTypes.func, // (id: PropTypes.string | null) => {},
    signOut: PropTypes.func,
    clearData: PropTypes.func,
    createUser: PropTypes.func, // (email:string, password:string) => {},
    signIn: PropTypes.func, // (email:string, password:string) => {},
}

const mapStateToProps = (state) => ({
    error: state.option.error,
    token: state.auth.token
})

export default connect(mapStateToProps, { setToken, clearData, logout })(App)