import React from 'react'
import { connect } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types'

import { removeProject, updateProject } from '../actions/actionCreator';
import { ProjectSettingsForm } from '../components/ProjectSettingsForm/ProjectSettingsForm'


const ProjectInfo = ({ updateProject, currentProject, removeProject, ...props }) => {

    // Не забыть про поле isOwner в проекте
    // Мои проекты - проекты где isOwner === true
    const { goBack } = useHistory()

    if (Object.keys(currentProject).length === 0) {
        return (<Redirect to='/' />)
    }
    const handleSubmit = (formData) => {
        updateProject({ _id: currentProject._id, ...formData });
        goBack()
    }
    return (
        <div className='settings border'>
            <div className='d-flex justify-content-between'>
                <h3>Settings {currentProject.title}</h3>
                <button className='btn btn-danger' onClick={() => removeProject(currentProject._id)}>Remove project</button>
            </div>
            <hr />
            <ProjectSettingsForm handleSubmit={handleSubmit} project={currentProject} />

        </div>
    )
}
ProjectInfo.propTypes = {
    loading: PropTypes.bool,
    currentProject: PropTypes.object,
    notes: PropTypes.arrayOf(PropTypes.object),
    removeProject: PropTypes.func,
    updateProject: PropTypes.func,
}


const mapS = state => ({
    loading: state.option.loading,
    currentProject: state.project.currentProject,
    notes: state.note.notes,
})

export default connect(mapS, { removeProject, updateProject })(ProjectInfo)