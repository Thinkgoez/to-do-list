import React from 'react'
import {useHistory} from 'react-router-dom'
import styled from 'styled-components'

const ButtonStyles = styled.button`
    display: inline-block;
    font-weight: 400;
    line-height: 1.5;
    color: #fff;
    text-align: center;
    text-decoration: none;
    vertical-align: middle;
    cursor: pointer;
    -webkit-user-select: none;
    user-select: none;
    background-color: #000;
    border: 1px solid transparent;
    padding: .375rem .75rem;
    font-size: 1rem;
    border-radius: .25rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    flex: 0 1 auto;
`

export const BackButton = () => {
    const history = useHistory()
    const backHandler = () => {
        history.goBack()
    }
    return (
        <ButtonStyles onClick={backHandler}>Back</ButtonStyles>
    )
}
// className='btn btn-secondary my-2'