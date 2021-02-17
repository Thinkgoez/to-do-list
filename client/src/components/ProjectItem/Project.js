import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

export const Project = ({ project, setProject, ...props }) => {
    return (
        <div className={'project'} timeout={800}>
            <NavLink to={`/projects/${project.title}`} onClick={() => setProject(project._id)}>
                <li className={`d-flex list-group-item note`}>
                    <div className='d-flex align-items-center'>
                        <strong>{project.title}</strong>
                        <small>{project.description}</small>
                    </div>
                    <div>
                    </div>
                </li>
            </NavLink>
        </div>
    )
}

export const projectPropType = PropTypes.exact({
    _id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    tasks: PropTypes.arrayOf(PropTypes.string),
    owner: PropTypes.string,
    isOwner: PropTypes.bool,
    __v: PropTypes.number
})

Project.propTypes = {
    setProject: PropTypes.func.isRequired,
    project: projectPropType.isRequired,
}