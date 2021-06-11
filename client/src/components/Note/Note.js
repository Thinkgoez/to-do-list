import PropTypes from 'prop-types';
import styled from 'styled-components'

const ListGroupItem = styled.li`
    width: 100%;
    position: relative;
    height: 50px;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 1rem;
    padding: 0 1rem;
    color: #212529;
    text-decoration: none;
    background-color: #fff;
    border: 1px solid rgba(0,0,0,.125);
    &.completed{
        background-color: palegreen;
    }
    margin-bottom: 1px;
    &:last-child{
        margin-bottom: 0;
    }
`

const InputCheckbox = styled.input`
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;

    background-color: initial;
    cursor: default;
    appearance: auto;
`

const AuthorName = styled.span`
    font-weight: 700;
    color: #6c757d;
`

const NoteFlex = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: max(10px, 1vw);
`

const DeleteButton = styled.button`
    display: inline-block;
    font-weight: 400;
    line-height: 1.5;
    text-align: center;
    text-decoration: none;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
    font-size: 1rem;

    padding: .25rem .5rem;
    font-size: .875rem;
    border-radius: .2rem;
    color: #dc3545;
    background-color: #fff;
    border: 1px solid #dc3545;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    &:hover, &:active{
        color: #fff;
        background-color: #dc3545;
        border-color: #dc3545;
    }
`

const NoteTitle = styled.strong`
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`
const NoteInfo = styled.div`
    --columns-quantity: 2;
    display: grid;
    grid-template-columns: 1fr repeat(var(--columns-quantity), auto);
    align-items: center;
    white-space: nowrap;
    gap: 1rem;
    
    @media (max-width: 670px){
        & span{
            display: none;
        }
        --columns-quantity: 1;
    }
    @media (max-width: 570px){
        & small{
            display: none;
        }
        --columns-quantity: 0;
    }
`

export const Note = ({ isWritable, note, onRemove, onCompleteNote, ...props }) => {
    return (
        <ListGroupItem key={note._id} className={`${note.completed ? ' completed' : ''}`} >
            <NoteFlex>
                {!isWritable || <InputCheckbox
                    type='checkbox'
                    checked={note.completed}
                    onChange={() => { onCompleteNote({ ...note, completed: !note.completed }) }}
                />}

                <NoteInfo>
                    <NoteTitle>{note.title}</NoteTitle>
                    <small>{new Date(note.date).toLocaleString()}</small>
                    <AuthorName>{note.autor}</AuthorName>
                </NoteInfo>
            </NoteFlex>
            <div>
                {!isWritable || <DeleteButton
                    type='button'
                    onClick={() => onRemove(note._id)}
                >
                    &times;  {/* Крестик */}
                </DeleteButton>}
            </div>
        </ListGroupItem>
    )
}

export const notePropType = PropTypes.exact({
    _id: PropTypes.string,
    project: PropTypes.string,
    title: PropTypes.string,
    date: PropTypes.string,
    completed: PropTypes.bool,
    description: PropTypes.string,
    autor: PropTypes.string,
    __v: PropTypes.number,
})

Note.propTypes = {
    onCompleteNote: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    note: notePropType.isRequired
}