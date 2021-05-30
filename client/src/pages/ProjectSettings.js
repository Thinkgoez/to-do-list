import React from 'react'
import { connect } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { removeProject, updateProject } from '../actions/actionCreator';
import { ProjectSettingsForm } from '../components/ProjectSettingsForm/ProjectSettingsForm'
import { Button } from '../components/common/Button';

const SettignsWrapper = styled.div`
    padding: 20px;
    border: 1px solid #dee2e6;
    display: flex;
    flex-direction: column;
    justify-content: center;
`
const BtnRemove = styled(Button)`
    color: #fff;
    background-color: #dc3545;
    border-color: #dc3545;
    &:hover{
        color: #fff;
        background-color: #bb2d3b;
    }
    &:active{
        background-color: #bb2d3b;
    }
`

const SettingsHeader = styled.div`
    display: flex;
    justify-content: space-between;
`

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
        <SettignsWrapper>
            <SettingsHeader>
                <h3>Settings {currentProject.title}</h3>
                <BtnRemove onClick={() => removeProject(currentProject._id)}>Remove project</BtnRemove>
            </SettingsHeader>
            <hr />
            <ProjectSettingsForm handleSubmit={handleSubmit} project={currentProject} />
        </SettignsWrapper>
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