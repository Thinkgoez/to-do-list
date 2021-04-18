import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import Card from 'react-bootstrap/Card'

// secondary" "success" "info" "dark" 

export const Project = ({ project, setProject, ...props }) => {
    let cName = ''
    if(project.isPublic && !project.isOwner){
        cName += ` ${project.isPublic}`
    }
    return (
        <Card className={`m-2${cName}`} border="secondary" style={{ width: '22%' }}>
            <NavLink to={`/projects/${project.title}`} onClick={() => setProject(project._id)}>
                <Card.Body>
                    <Card.Title>{project.title}</Card.Title>
                    <Card.Text>{project.description}</Card.Text>
                </Card.Body>
            </NavLink>
        </Card>
    )
}

export const projectPropType = PropTypes.exact({
    _id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    tasks: PropTypes.arrayOf(PropTypes.string),
    owner: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    // {
    //     id: PropTypes.string,
    //     username: PropTypes.string
    // },
    isOwner: PropTypes.bool,
    isPublic: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    __v: PropTypes.number
})

Project.propTypes = {
    setProject: PropTypes.func.isRequired,
    project: projectPropType.isRequired,
}