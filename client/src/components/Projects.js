import *as React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

const Projects = ({ setCurrentProject, removeProject, projects, ...props }) => {
    return (
        <>
            { projects.length !== 0 ?
                <ul className="list-group">
                    {projects.map(project => (
                        <Project
                            key={project._id}
                            project={project}
                            onRemove={removeProject}
                            setProject={setCurrentProject}
                        />
                    ))}
                </ul>
                : <div>Здесь пока нету проектов...</div>
            }
        </>
    )
}
const Project = ({ project, setProject, ...props }) => {
    return (
        <div className={'project'} timeout={800}>
            <NavLink to={`/projects/${project.title}`} onClick={() => setProject(project._id)}>
                <li className={`d-flex list-group-item note`}>
                    <div className='d-flex align-items-center'>
                        <strong>{project.title}</strong>
                        {/* <small>{new Date(project.date).toLocaleString()}</small> */}
                        <small>{project.description}</small>
                    </div>
                    <div>
                        {/* <button
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => props.onRemove(project.id)}
                        >
                            &times;  {/* Крестик 
                        </button> */}
                    </div>
                </li>
            </NavLink>
        </div>
    )
}

const projectPropType = PropTypes.exact({
    _id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    tasks: PropTypes.arrayOf(PropTypes.string),
    owner: PropTypes.string,
    isOwner: PropTypes.bool,
    __v: PropTypes.number
})
Projects.propTypes = {
    setCurrentProject: PropTypes.func,
    projects: PropTypes.arrayOf(projectPropType),
    removeProject: PropTypes.func,
}
Project.propTypes = {
    setProject: PropTypes.func.isRequired,
    project: projectPropType.isRequired,
}

export default Projects