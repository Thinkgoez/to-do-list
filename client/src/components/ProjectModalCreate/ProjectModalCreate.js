import React, { useState } from 'react'
import styled from 'styled-components'
import { ProjectCreateForm } from '../ProjectCreateForm/ProjectCreateForm'
import { Button } from '../common/Button'
import { ModalWrapper, ModalDialog, ModalContent, ModalHeader, ModalBody } from './StyledComponents'

const BtnCreate = styled(Button)`
    @media (max-width: 355px){
        &{
            width: 75px;
        }
    }
`

export const ProjectModalCreate = ({ ...props }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClick = (e) => {
        if (e.target.closest('#modal-create-project')) return false
        handleClose()
    }
    return (
        <div>
            <BtnCreate onClick={handleShow}>New project</BtnCreate>
            { show
                ? <ModalWrapper onClick={handleClick}>
                    <ModalDialog id='modal-create-project'>
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