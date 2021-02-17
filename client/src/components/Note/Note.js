import PropTypes from 'prop-types';

export const Note = ({ note, onRemove, onCompleteNote, ...props }) => {
    return (
        <li key={note._id} className={`d-flex list-group-item note${note.completed ? ' completed' : ''}`} >
            <div className='d-flex align-items-center'>
                <input
                    type='checkbox'
                    checked={note.completed}
                    onChange={() => { onCompleteNote({ ...note, completed: !note.completed }) }}
                />&nbsp;&nbsp;
                                <div className={'info'}>
                    <strong>{note.title}</strong>
                    <small>{new Date(note.date).toLocaleString()}</small>
                </div>
            </div>
            <div>
                <button
                    type='button'
                    className='btn btn-outline-danger btn-sm'
                    onClick={() => onRemove(note._id)}
                >
                    &times;  {/* Крестик */}
                </button>
            </div>
        </li>
    )
}

export const notePropType = PropTypes.exact({
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