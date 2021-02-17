import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { ProjectCreateForm } from '../ProjectCreateForm/ProjectCreateForm'

export const ProjectCreateModal = ({ ...props }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Button variant="primary" onClick={handleShow}>New project</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create new project</Modal.Title>
                </Modal.Header>
                <Modal.Body><ProjectCreateForm handleClose={handleClose} {...props} /></Modal.Body>
            </Modal>            
        </div>
    )
}