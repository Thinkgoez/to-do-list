import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
// import { Redirect } from 'react-router-dom';

import { addProject, fetchProjects, removeProject, setCurrentProject } from '../actions/actionCreator';
import Projects from '../components/ProjectList/Projects';
import { Loader } from '../components/Loader/Loader';
import { ProjectModalCreate } from '../components/ProjectModalCreate/ProjectModalCreate';


const Home = ({
    fetchProjects, projects, isAuth, addProject,
    setCurrentProject, loading, removeProject, isError, ...props
}) => {
    useEffect(() => {
        if (!isError && isAuth) {
            fetchProjects()
        }
    }, [isError, fetchProjects, isAuth])
    // if (!isAuth) return <Redirect to='/login' />
    return (
        <>
            <ProjectModalCreate submitForm={addProject} />
            <hr />
            {loading
                ? <Loader />
                : <Projects projects={projects} removeProject={removeProject} setCurrentProject={setCurrentProject} />
            }
        </>
    )
}

Home.propTypes = {
    loading: PropTypes.bool,
    projects: PropTypes.array,
    isError: PropTypes.any,
    isAuth: PropTypes.bool,
    removeProject: PropTypes.func,
    fetchProjects: PropTypes.func,
    setCurrentProject: PropTypes.func,
    addProject: PropTypes.func,
}

const mapStateToProps = state => ({
    loading: state.option.loading,
    projects: state.project.projects,
    isError: state.auth.error,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { removeProject, fetchProjects, setCurrentProject, addProject })(Home)