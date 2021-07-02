import styled from 'styled-components'
import { Button } from './Button'

export const FormLabel = styled.label`
    margin-bottom: .5rem;
    display: inline-block;
`
const inputStyles = `
    display: block;
    width: 100%;
    padding: .375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-clip: padding-box;
    border: 2px solid #ced4da;
    -webkit-appearance: none;
    appearance: none;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    margin: .5rem 0;
    resize: vertical;
    &:focus {
        border-color: #97ff97;
        outline: 0;
    }
    &.invalid{
        border-color: red;
    }
`
export const FormControl = styled.input`${inputStyles}`
export const TextArea = styled.textarea`${inputStyles}
    min-height: calc(1.5em + .75rem + 2px);
`
export const Error = styled.div`
    position: absolute;
    display: inline-block;
    bottom: 7%;
    right: 1%;
    padding: 2px 7px;
    font-size: .975em;
    background-color: #fff;
    border-radius: 5px;
    color: red;
    border: 1px red solid;
    font-weight: 600;
`
export const FormGroup = styled.div`
    margin-bottom: 1rem;
    position: relative;
`
export const FormCheck = styled.div`
    display: block;
    min-height: 1.5rem;
    padding-left: 1.5em;
    margin-bottom: .125rem;
`

export const CheckBox = styled.input`
    float: left;
    cursor: pointer;
    
    margin-left: -1.5em;
    border-radius: 50%;
    width: 1em;
    height: 1em;
    margin-top: .25em;
    vertical-align: top;
    background-color: #fff;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    border: 1px solid rgba(0,0,0,.25);
    -webkit-appearance: none;
    appearance: none;
    
    -webkit-print-color-adjust: exact;
    color-adjust: exact;
    
    &:hover{
        border: 3px solid #000;
    }
    &:checked{
        border: 3px solid #000;
        box-shadow: 0 0 0 3px #fff inset;
        background-color: #000;
    }
`

export const BtnSecondary = styled(Button)`
    margin-right: 1rem;
    &:hover{
        color: #fff;
        background-color: #6c757d;
        border-color: #6c757d;
    }
    &:active{
        border-color: #273956;
    }
`
export const BtnPrimary = styled(Button)`
    &:hover{
        color: #000;
        background-color: #97ff97;
        border-color: #6c757d;
    }
    &:active{
        border-color: #273956;
    }
`
export const SendButton = styled.button`
    cursor: pointer;
    padding: .375rem .75rem;
    font-size: 1rem;
    border-radius: .25rem;
    display: inline-block;
    font-weight: 400;
    line-height: 1.5;
    text-align: center;
    text-decoration: none;
    box-sizing: border-box;
    -webkit-user-select: none;
    user-select: none;

    position: absolute;
    color: #273956;
    right: 0;
    top: 2px;
    background: transparent;
    border-color: transparent;
    transition: color .15s linear, background-color .15s linear, border-color .15s linear,box-shadow .15s linear;
    &:hover{
        border-left-color: #6c757d;
    }
    &:disabled{
        color: #ccc;
    }
`
;
