import React from 'react'
import { connect } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types'
import styled from 'styled-components'
// import { RiDeleteBin5Line } from 'react-icons/ri/RiDeleteBin5Line'
import { RiDeleteBin5Line } from 'react-icons/ri'

import { removeProject, updateProject } from '../actions/actionCreator';
import { ProjectSettingsForm } from '../components/ProjectSettingsForm/ProjectSettingsForm'
import { Button } from '../components/common/Button';

const DeleteBtn = styled(RiDeleteBin5Line)`
    cursor: pointer;
    width: 35px;
    height: 35px;
    display: none;
    background-color: #dc3545;
    padding: 5px;
    border-radius: 10px;
    
    &:active{
        background-color: #96242f;
        color: #ccc;
        outline: none;
    }
`

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
const ProjectTitle = styled.span`
    display: inline-block;
    width: 30vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`
const H3Flex = styled.h3`
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 10px;
`
const SettingsHeader = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 10px;
    @media (max-width: 680px){
        ${DeleteBtn} {
            display: block;
        }
        ${BtnRemove} {
            display: none;
        }
    }
    @media (max-width: 440px){
        ${ProjectTitle} {
            display: none;
        }
    }
`

const ProjectInfo = ({ updateProject, currentProject, removeProject, ...props }) => {
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
                <H3Flex>Settings <ProjectTitle>{currentProject.title}</ProjectTitle></H3Flex>
                <BtnRemove onClick={() => removeProject(currentProject._id)}>Remove project</BtnRemove>
                <DeleteBtn onClick={() => removeProject(currentProject._id)}>Remove project</DeleteBtn>
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