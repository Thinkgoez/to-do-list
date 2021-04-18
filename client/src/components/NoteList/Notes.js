import React from 'react';
import PropTypes from 'prop-types';

import { Note, notePropType } from '../Note/Note'

export const Notes = ({isWritable, notes, onRemove, onCompleteNote, ...props }) => {
    // useEffect(() => {
    //     effect
    //     return () => {
    //         cleanup
    //     }
    // }, [input])
    return (
        <div className='notes-list'>
            <h3>Task list</h3>
            { notes.length !== 0 ?
                <ul className='list-group'>
                    {notes.map(note => (
                        <Note isWritable={isWritable} key={note._id} note={note} onRemove={onRemove} onCompleteNote={onCompleteNote} />
                    ))}
                </ul>
                : <div>Здесь пока нету заметок...</div>
            }
        </div>
    )
}

Notes.propTypes = {
    onCompleteNote: PropTypes.func,
    onRemove: PropTypes.func,
    notes: PropTypes.arrayOf(notePropType)
}