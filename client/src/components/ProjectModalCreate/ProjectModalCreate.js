import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import styled from 'styled-components'
import { ProjectCreateForm } from '../ProjectCreateForm/ProjectCreateForm'

const Button = styled.button`
    color: white;
    border: 1px solid white;
    padding: .375rem .75rem;
    font-size: 1rem;
    border-radius: .25rem;
    background-color: transparent;
    display: inline-block;
    font-weight: 400;
    line-height: 1.5;
    text-align: center;
    text-decoration: none;
    transition: background-color .15s linear, color .15s linear;
    box-sizing: border-box;
    &:hover{
        color: #174082;
        background-color: white;
        transition: background-color .25s linear, color .25s linear;
    }
    &:active{
        border: 2px solid #273956;
        padding: calc(.375rem - 1px) calc(.75rem - 1px);
        border-radius: calc(.25rem + 2px);
    }
`

export const ProjectModalCreate = ({ ...props }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Button onClick={handleShow}>New project</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Create new project</Modal.Title>
                </Modal.Header>
                <Modal.Body><ProjectCreateForm handleClose={handleClose} {...props} /></Modal.Body>
            </Modal>            
        </div>
    )
}