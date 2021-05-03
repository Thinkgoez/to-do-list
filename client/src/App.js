import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Alert from './components/Alert/Alert';
import Navbar from './components/Navbar/Navbar';
import PrivateHoc from './components/PrivateHoc/PrivateHoc';
import Home from './pages/Home';
import About from './pages/About';
import Register from './pages/Register';
import Login from './pages/Login';
import ProjectInfo from './pages/ProjectInfo';
// import UserInfo from './pages/UserInfo';
import ProjectSettings from './pages/ProjectSettings';

import { clearData, getProfileFetch, logout } from './actions/actionCreator';


const App = ({ getProfileFetch, logout, isAuthError, isAuth, clearData, ...props }) => {
    useEffect(() => {
        getProfileFetch()
    }, [getProfileFetch])

    const handleLogout = () => {
        clearData()
        logout()
    }
    return (
        <BrowserRouter>
            <Navbar isAuth={isAuth} logout={handleLogout} />
            <div className='container pt-4'>
                <Alert />
                <Switch>
                    <Route path={'/'} exact component={PrivateHoc(Home)} />
                    <Route path={'/about'} component={About} />
                    <Route path={'/register'} component={() => <Register />} />
                    <Route path={'/login'} component={() => <Login />} />
                    {/* <Route path={'/UserInfo'} component={() => <UserInfo {...props} />} /> */}
                    <Route path={'/projects/settings/:projectTitle'} component={PrivateHoc(ProjectSettings)} />
                    <Route path={'/projects/:projectTitle?'} component={PrivateHoc(ProjectInfo)} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

App.propTypes = {
    user: PropTypes.string,
    error: PropTypes.string,
    signOut: PropTypes.func,
    clearData: PropTypes.func,
    createUser: PropTypes.func, // (email:string, password:string) => {},
    signIn: PropTypes.func, // (email:string, password:string) => {},
    isAuthError: PropTypes.any,
    isAuth: PropTypes.bool,
}

const mapStateToProps = (state) => ({
    error: state.option.error,
    isAuthError: state.auth.error,
    isAuth: state.auth.isAuth,
})

export default connect(mapStateToProps, { clearData, logout, getProfileFetch })(App)