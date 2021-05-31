import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { addProject, fetchProjects, removeProject, setCurrentProject } from '../actions/actionCreator';
import Projects from '../components/ProjectList/Projects';
import ProjectsSorting from '../components/ProjectsSorting/ProjectsSorting';
import { ProjectModalCreate } from '../components/ProjectModalCreate/ProjectModalCreate';
import { Loader } from '../components/Loader/Loader';
import { FlexBTW } from '../components/common/Flex'

const Home = ({
    fetchProjects, projects, isAuth, addProject,
    setCurrentProject, loading, removeProject, isError, ...props
}) => {
    useEffect(() => {
        if (!isError && isAuth) {
            fetchProjects()
        }
    }, [isError, fetchProjects, isAuth])
    const [projectsOrder, setProjectsOrder] = useState('descending')
    const [isOnlyOwn, setOnlyOwn] = useState(false)
    return (
        <>
            <FlexBTW>
                <ProjectModalCreate submitForm={addProject} />
                <ProjectsSorting setProjectsOrder={setProjectsOrder} isOnlyOwn={isOnlyOwn} setOnlyOwn={setOnlyOwn} />
            </FlexBTW>

            <hr />
            {loading
                ? <Loader />
                : <>
                    <Projects
                        projectsOrder={projectsOrder}
                        projects={projects}
                        removeProject={removeProject}
                        setCurrentProject={setCurrentProject}
                        isOnlyOwn={isOnlyOwn}
                    />
                </>
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