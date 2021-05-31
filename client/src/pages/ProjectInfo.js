import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import styled from 'styled-components'

import { NoteAddForm } from '../components/NoteAddForm/NoteAddForm';
import { Notes } from '../components/NoteList/Notes';
import { Loader } from '../components/Loader/Loader';
import { BackButton } from '../components/common/BackButton';
import { addNote, fetchNotes, onChangeCompleteNote, removeNote, removeProject } from '../actions/actionCreator';
import { Button } from '../components/common/Button';

const Hgrey = styled.h4`
    color: #ccc;
    font-size: 1.5rem;
`
const Container = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    align-items: center;

`

const ProjectInfo = ({
    onChangeCompleteNote, removeNote, addNote, fetchNotes,
    currentProject, notes, loading,
    ...props
}) => {
    useEffect(() => {
        if (currentProject?._id)
            fetchNotes(currentProject._id)
    }, [currentProject._id, fetchNotes])

    if (Object.keys(currentProject).length === 0) {
        return (<Redirect to='/' />)
    }
    const isWritable = currentProject.isPublic === 'writable' || currentProject.isOwner
    return (
        <>
            <div >
                <h3>{currentProject.title}</h3>
                <Hgrey>{currentProject.owner.username}</Hgrey>
                <Container>
                    <BackButton />
                    {currentProject.isOwner
                        ? <NavLink to={`/projects/settings/${currentProject.title}/`}>
                            <Button>Settings</Button>
                        </NavLink>
                        : null
                    }
                </Container>
                {!isWritable || <NoteAddForm handleSubmit={(formData) => addNote(formData.formValue, currentProject._id)} />}
                <hr />
            </div>
            <div>
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