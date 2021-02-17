import React from 'react'
import PropTypes from 'prop-types'

import { Project, projectPropType } from '../ProjectItem/Project'

const Projects = ({ setCurrentProject, removeProject, projects, ...props }) => {
    return (
        <>
            { projects.length !== 0 ?
                <ul className='list-group'>
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

Projects.propTypes = {
    setCurrentProject: PropTypes.func,
    projects: PropTypes.arrayOf(projectPropType),
    removeProject: PropTypes.func,
}

export default Projects