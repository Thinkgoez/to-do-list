import React from 'react'
import { useEffect } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';

import { NoteAddForm } from '../components/NoteAddForm/NoteAddForm';
import { Notes } from '../components/NoteList/Notes';
import { Loader } from '../components/Loader/Loader';

import { removeProject } from '../redux/projectsHandler/projectsReducer';
import { addNote, fetchNotes, onChangeCompleteNote, removeNote } from '../redux/notesHandler/notesReducer';
import { BackButton } from '../components/common/BackButton';



const ProjectInfo = ({
    onChangeCompleteNote, removeNote, addNote, fetchNotes,
    currentProject, notes, loading,
    ...props
}) => {
    useEffect(() => {
        if (currentProject._id)
            fetchNotes(currentProject._id)
    }, [currentProject._id, fetchNotes])

    if (Object.keys(currentProject).length === 0) {
        return (<Redirect to='/' />)
    }
    const isWritable = currentProject.isPublic === 'writable' || currentProject.isOwner

    return (
        <>
            <div className='project-title'>
                <h3>{currentProject.title}</h3>
                <BackButton className='btn btn-secondary my-2' />
                {currentProject.isOwner
                    ? <NavLink to={`/projects/settings/${currentProject.title}/`} className='btn btn-secondary float-end my-2'>Settings</NavLink>
                    : null
                }
                {!isWritable || <NoteAddForm handleSubmit={(formData) => addNote(formData.formValue, currentProject._id)} />}
                <hr />
            </div>
            <div className='project-container'>
                {loading
                    ? <Loader />
                    : <Notes
                        isWritable={isWritable}
                        notes={notes}
                        onRemove={removeNote}
                        onCompleteNote={onChangeCompleteNote}
                    />
                }
            </div>
        </>
    )
}

ProjectInfo.propTypes = {
    removeProject: PropTypes.func,
    addNote: PropTypes.func,
    fetchNotes: PropTypes.func,
    removeNote: PropTypes.func,
    onChangeCompleteNote: PropTypes.func,
    loading: PropTypes.bool,
    currentProject: PropTypes.object,
    notes: PropTypes.arrayOf(PropTypes.object)
}

const mapS = state => ({
    loading: state.option.loading,
    currentProject: state.project.currentProject,
    notes: state.note.notes,
})

export default connect(mapS, { removeProject, addNote, fetchNotes, removeNote, onChangeCompleteNote })(ProjectInfo)