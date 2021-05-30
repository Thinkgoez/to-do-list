import React, { useState } from 'react'
import { ProjectCreateForm } from '../ProjectCreateForm/ProjectCreateForm'
import { Button } from '../common/Button'
import { ModalWrapper, ModalDialog, ModalContent, ModalHeader, ModalBody } from './StyledComponents'

export const ProjectModalCreate = ({ ...props }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClick = (e) => {
        if (e.target.closest('.modal-dialog')) return false
        handleClose()
    }
    return (
        <div>
            <Button onClick={handleShow}>New project</Button>
            { show
                ? <ModalWrapper onClick={handleClick}>
                    <ModalDialog className='modal-dialog'>
                        <ModalContent>
                            <ModalHeader><h4>Create new project</h4></ModalHeader>
                            <ModalBody><ProjectCreateForm handleClose={handleClose} {...props} /></ModalBody>
                        </ModalContent>
                    </ModalDialog>
                </ModalWrapper>
                : null
            }

        </div>
    )
}