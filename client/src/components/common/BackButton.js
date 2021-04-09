import React from 'react'
import Button from 'react-bootstrap/Button'
import {useHistory} from 'react-router-dom'

export const BackButton = ({className = ''}) => {
    const history = useHistory()
    const backHandler = () => {
        history.goBack()
    }
    return (
        <Button onClick={backHandler} variant="dark" className={`${className}`}>Back</Button>
    )
}