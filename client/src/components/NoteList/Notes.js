import React from 'react';
import PropTypes from 'prop-types';
import s from './Notes.module.css'

import { Note, notePropType } from '../Note/Note'

export const Notes = ({isWritable, notes, onRemove, onCompleteNote, ...props }) => {
    return (
        <div>
            <h3>Task list</h3>
            { notes.length !== 0 ?
                <ul className={s.listGroup}>
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