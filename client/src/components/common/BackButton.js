import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from './Button'

const ButtonStyles = styled(Button)`
    color: #fff;
    vertical-align: middle;
    background-color: #000;
    border: 1px solid transparent;
    flex: 0 1 auto;
    &:hover{
        background-color: #525252;
        color: #fff
    }
`

export const BackButton = (props) => {
    const history = useHistory()
    const backHandler = () => {
        history.goBack()
    }
    return (
        <ButtonStyles onClick={backHandler} {...props} >Back</ButtonStyles>
    )
}
// className='btn btn-secondary my-2'