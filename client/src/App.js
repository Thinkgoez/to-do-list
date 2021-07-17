import React, { useEffect, Suspense } from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";

import Navbar from "./components/Navbar/Navbar";
import { Loader } from "./components/Loader/Loader";
import PrivateHoc from "./components/PrivateHoc/PrivateHoc";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

import { clearData, getProfileFetch, logout } from "./actions/actionCreator";
// import UserInfo from './pages/UserInfo';
const Alert = React.lazy(() => import("./components/Alert/Alert"));
const Alert2 = React.lazy(() => import("./components/Alert/Alert2"));
const About = React.lazy(() => import("./pages/About"));
const ProjectInfo = React.lazy(() => import("./pages/ProjectInfo"));
const ProjectSettings = React.lazy(() => import("./pages/ProjectSettings"));
// import ProjectSettings from './pages/ProjectSettings';

const App = ({
    getProfileFetch,
    logout,
    isAuthError,
    isAuth,
    clearData,
    ...props
}) => {
    useEffect(() => {
        getProfileFetch();
    }, [getProfileFetch]);

    const handleLogout = () => {
        clearData();
        logout();
    };
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <BrowserRouter>
                <Navbar isAuth={isAuth} logout={handleLogout} />
                <div className="container pt-4">
                    <Suspense fallback={<Loader />}>
                        {/* <Alert /> */}
                        <Switch>
                            <Route
                                path={"/"}
                                exact
                                component={PrivateHoc(Home)}
                            />
                            <Route path={"/about"} component={About} />
                            <Route
                                path={"/register"}
                                component={() => <Register />}
                            />
                            <Route
                                path={"/login"}
                                component={() => <Login />}
                            />
                            {/* <Route path={'/UserInfo'} component={() => <UserInfo {...props} />} /> */}
                            <Route
                                path={"/projects/settings/:projectTitle"}
                                component={PrivateHoc(ProjectSettings)}
                            />
                            <Route
                                path={"/projects/:projectTitle?"}
                                component={PrivateHoc(ProjectInfo)}
                            />
                        </Switch>
                        <Alert2 />
                    </Suspense>
                </div>
            </BrowserRouter>
        </ErrorBoundary>
    );
};

function ErrorFallback({ error }) {
    return (
        <div className='errorFallback'>
            <h2>Something went wrong...</h2>
            <p>Try to reload page!</p>
        </div>
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
};

const mapStateToProps = (state) => ({
    error: state.option.error,
    isAuthError: state.auth.error,
    isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { clearData, logout, getProfileFetch })(
    App
);
