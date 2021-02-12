import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect, RootStateOrAny } from 'react-redux';
import Home from './pages/Home';
import { About } from './pages/About';
import { Navbar } from './components/Navbar';
import Alert from './components/Alert';
import SignUp from './pages/auth/SignUp';
import Login from './pages/auth/Login';
import { setUserID, clearData, signOut, createUser, signIn } from './redux/projectsHandler/projectsReducer';
import ProjectInfo from './pages/Project/ProjectInfo';
import ProjectSettings from './pages/Project/ProjectSettings';
import UserInfo from './pages/auth/UserInfo';

const App = ({ signOut, ...props }) => {
    useEffect(() => {
        if (props.user) {
            props.setUserID(props.user.uid)
        } else {
            props.setUserID(null)
        }
        return () => {
            props.setUserID(null)
        };
    }, [props.user])
    const handleLogout = async () => {
        clearData()
        await signOut()

    }
    return (
        <BrowserRouter>
            <Navbar user={props.user} signOut={handleLogout} />
            <div className="container pt-4">
                <Alert />
                <Switch>
                    <Route path={'/'} exact component={() => <Home />} />
                    <Route path={'/about'} component={About} />
                    <Route path={'/sign-up'} component={() => <SignUp {...props} />} />
                    <Route path={'/sign-in'} component={() => <Login {...props} />} />
                    <Route path={'/UserInfo'} component={() => <UserInfo {...props} />} />
                    <Route path={'/projects/settings/:projectTitle'} component={() => <ProjectSettings {...props} />} />
                    <Route path={'/projects/:projectTitle?'} component={() => <ProjectInfo />} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

App.propTypes = {
    user: {
        uid: string
    },
    error: string | null,
    setUserID: (id: string | null) => {},
    signOut: () => {},
    clearData: () => {},
    createUser: (email:string, password:string) => {},
    signIn: (email:string, password:string) => {},
}

const mapStateToProps = (state) => ({
    user: state.authUser.state,
    error: state.something.error
})

export default connect(mapStateToProps, { setUserID, clearData, signOut, createUser, signIn })(App)