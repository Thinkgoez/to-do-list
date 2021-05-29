import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { ProjectCreateForm } from '../ProjectCreateForm/ProjectCreateForm'
import { Button } from '../common/Button'


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