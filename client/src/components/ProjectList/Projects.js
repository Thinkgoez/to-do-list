import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Project, projectPropType } from '../ProjectItem/Project'


const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-template-rows: repeat(auto-fit, 1fr);
    gap: 2rem;
`


const Projects = ({ projectsOrder, setCurrentProject, removeProject, projects, isOnlyOwn, ...props }) => {
    let projectsList = [...projects].reverse()
    // reverse because projects stored in BD like queue, first created has "0" - index

    // this switch ... it shouldn't be here !!! need to refaktor... but how...
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
    if(isOnlyOwn){
        projectsList = projectsList.filter(pr => pr.isOwner)
    }
    return (
        <>
            { projectsList.length !== 0 ?
                <Grid>
                        {projectsList.map(project => (
                            <Project
                                key={project._id}
                                project={project}
                                onRemove={removeProject}
                                setProject={setCurrentProject}
                            />
                        ))}
                </Grid>

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
    isOnlyOwn: PropTypes.bool,
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