import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import s from './Project.module.css'
// secondary" "success" "info" "dark" 

export const Project = ({ project, setProject, ...props }) => {
    let cName = ''
    if(project.isPublic && !project.isOwner){
        cName += ` ${s[project.isPublic]}`
    }
    return (
        <div className={s.card + cName}>
            <NavLink to={`/projects/${project.title}`} onClick={() => setProject(project._id)}>
                <div className={s.cardBody}>
                    <div className={s.cardTitle}>{project.title}</div>
                    <p>{project.description}</p>
                </div>
            </NavLink>
        </div>
    )
}

export const projectPropType = PropTypes.exact({
    _id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    tasks: PropTypes.arrayOf(PropTypes.string),
    owner: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    isOwner: PropTypes.bool,
    isPublic: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    __v: PropTypes.number
})

Project.propTypes = {
    setProject: PropTypes.func.isRequired,
    project: projectPropType.isRequired,
}