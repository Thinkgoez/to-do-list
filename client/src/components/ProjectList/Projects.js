import React from 'react'
import PropTypes from 'prop-types'
import CardColumns from 'react-bootstrap/CardDeck'

import { Project, projectPropType } from '../ProjectItem/Project'

const Projects = ({ setCurrentProject, removeProject, projects, ...props }) => {
    return (
        <>
            { projects.length !== 0 ?
                <CardColumns className="row g-2">
                    {projects.map(project => (
                        <Project
                            key={project._id}
                            project={project}
                            onRemove={removeProject}
                            setProject={setCurrentProject}
                        />
                    ))}
                </CardColumns>
                : <div>Здесь пока нету проектов...</div>
            }
        </>
    )
}

Projects.propTypes = {
    setCurrentProject: PropTypes.func,
    projects: PropTypes.arrayOf(projectPropType),
    removeProject: PropTypes.func,
}

export default Projects