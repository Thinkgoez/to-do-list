import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';


import s from './Notes.module.css'
import { Note, notePropType } from '../Note/Note'

export const Notes = ({ isWritable, notes=[], onRemove, onCompleteNote, ...props }) => {
    return (
        <div>
            <h3>Task list</h3>
            {notes.length === 0 && <div>Здесь пока нету заметок...</div>}
            <TransitionGroup component='ul' className={s.listGroup}>
                    {notes.map(note => (
                        <CSSTransition
                            key={note._id}
                            timeout={500}
                            classNames='note'
                        >
                            <Note
                                isWritable={isWritable}
                                note={note}
                                onRemove={onRemove}
                                onCompleteNote={onCompleteNote}
                            />
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            
        </div>
    )
}

Notes.propTypes = {
    onCompleteNote: PropTypes.func,
    onRemove: PropTypes.func,
    notes: PropTypes.arrayOf(notePropType)
}