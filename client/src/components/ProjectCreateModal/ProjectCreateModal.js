import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { ProjectCreateForm } from '../ProjectCreateForm/ProjectCreateForm'

export const ProjectCreateModal = ({ ...props }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // const [isOpen, set] = useState(false)
    // const openClick = () => {
    //     set(true)
    // }
    // if (!isOpen) return ()

    return (
        <div>
            {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Open modal for @mdo</button> */}

            <Button variant="primary" onClick={handleShow}>Launch demo modal</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create new project</Modal.Title>
                </Modal.Header>
                <Modal.Body><ProjectCreateForm {...props} /></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handleClose}>Create</Button>
                </Modal.Footer>
            </Modal>            
        </div>
    )
}