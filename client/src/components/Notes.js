import *as React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group'


export const Notes = ({ notes, onRemove, onCompleteNote, ...props }) => {
    return (
        <>
            <h3>Task list</h3>
            { notes.length !== 0 ?
                <TransitionGroup component="ul" className="list-group">
                    {notes.map(note => (
                        <Note key={note._id} note={note} onRemove={onRemove} onCompleteNote={onCompleteNote} />
                    ))}
                </TransitionGroup>
                : <div>Здесь пока нету заметок...</div>
            }
        </>
    )
}

const Note = ({ note, onRemove, onCompleteNote, ...props }) => {
    return (
        <CSSTransition
            key={note._id}
            classNames={'note'}
            timeout={800}
        >
            <li className={`d-flex list-group-item note${note.completed ? ' completed' : ''}`} >
                <div className='d-flex align-items-center'>
                    <input
                        type="checkbox"
                        checked={note.completed}
                        onChange={() => { onCompleteNote({...note, completed: !note.completed}) }}
                    />&nbsp;&nbsp;
                                <div className={'info'}>
                        <strong>{note.title}</strong>
                        <small>{new Date(note.date).toLocaleString()}</small>
                    </div>
                </div>
                <div>
                    <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => onRemove(note._id)}
                    >
                        &times;  {/* Крестик */}
                    </button>
                </div>
            </li>
        </CSSTransition>
    )
}
const notePropType = PropTypes.exact({
    _id: PropTypes.string,
    project: PropTypes.string,
    title: PropTypes.string,
    date: PropTypes.string,
    completed: PropTypes.bool,
    description: PropTypes.string,
    __v: PropTypes.number,
})
Note.propTypes = {
    onCompleteNote: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    note: notePropType.isRequired
}
Notes.propTypes = {
    onCompleteNote: PropTypes.func,
    onRemove: PropTypes.func,
    notes: PropTypes.arrayOf(notePropType)
}