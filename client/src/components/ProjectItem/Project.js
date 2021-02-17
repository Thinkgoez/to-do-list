import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import Card from 'react-bootstrap/Card'

// secondary" "success" "info" "dark" 

export const Project = ({ project, setProject, ...props }) => {
    return (
        <Card className={'m-2'} border="secondary" style={{ width: '22%' }}>
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
    owner: PropTypes.string,
    isOwner: PropTypes.bool,
    __v: PropTypes.number
})

Project.propTypes = {
    setProject: PropTypes.func.isRequired,
    project: projectPropType.isRequired,
}