import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Projects from '../components/ProjectList/Projects';
import { Loader } from '../components/Loader/Loader';
import { addProject, fetchProjects, removeProject, setCurrentProject } from '../redux/projectsHandler/projectsReducer';
import { ProjectCreateModal } from '../components/ProjectCreateModal/ProjectCreateModal';


const Home = ({ fetchProjects, projects, addProject, setCurrentProject, loading, removeProject, isAuth, ...props }) => {
    useEffect(() => {
        if (isAuth) {
            fetchProjects()
        }
    }, [isAuth, fetchProjects])
    if (!isAuth) return <Redirect to='/login' />
    return (
        <>
            <ProjectCreateModal submitForm={addProject} />
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
    projects: state.project.projects,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { removeProject, fetchProjects, setCurrentProject, addProject })(Home)