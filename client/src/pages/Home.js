import * as React from 'react'
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Form from '../components/Form';
import Projects from '../components/Projects';
import { Loader } from '../components/Loader';
import { addProject, fetchProjects, removeProject, setCurrentProject } from '../redux/projectsHandler/projectsReducer';


const Home = ({ fetchProjects, projects, addProject, setCurrentProject, loading, removeProject, token, ...props }) => {
    useEffect(() => {
        if (!!token) {
            fetchProjects()
        }
    }, [token, fetchProjects])
    if (!token) return <Redirect to='/login' />
    return (
        <>
            <Form handleSubmit={(fromData) => addProject(fromData.formValue, 'second')} />
            <hr />
            {loading
                ? <Loader />
                : <Projects projects={projects} removeProject={removeProject} setCurrentProject={setCurrentProject} />
            }
        </>
    )
}

const mapStateToProps = state => ({
    loading: state.option.loading,
    projects: state.projects.projects,
    token: state.auth.token
})

export default connect(mapStateToProps, { removeProject, fetchProjects, setCurrentProject, addProject })(Home)