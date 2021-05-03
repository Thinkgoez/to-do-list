import React from 'react'
import PropTypes from 'prop-types'
import CardColumns from 'react-bootstrap/CardDeck'

import { Project, projectPropType } from '../ProjectItem/Project'

const Projects = ({ projectsOrder, setCurrentProject, removeProject, projects, ...props }) => {
    let projectsList = projects
    // this switch ... it shouldn't be here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! need to refaktor
    switch (projectsOrder) {
        case 'descending':
            projectsList = [...projects].reverse()
            break;
        case 'ascending':
            projectsList = [...projects]
            break;
        case 'own':
            projectsList = ownSort(projectsList)
            break;
        case 'another':
            projectsList = anotherSort(projectsList)
            break;

        default:
            break;
    }
    return (
        <>
            { projectsList.length !== 0 ?
                <CardColumns className="row g-2">
                    {projectsList.map(project => (
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
    projectsOrder: PropTypes.string,
}
function ownSort(arr) {
    let helper = arr.filter(pr => pr.isOwner)
    arr.filter(pr => !pr.isOwner).forEach(pr => helper.push(pr));
    return helper
}
function anotherSort(arr) {
    let helper = arr.filter(pr => !pr.isOwner)
    arr.filter(pr => pr.isOwner).forEach(pr => helper.push(pr));
    return helper
}
export default Projects