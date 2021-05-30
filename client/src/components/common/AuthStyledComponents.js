import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { Button } from './Button'
import { FormControl } from './FormStyledComponents'

export const AuthButton = styled(Button)`
    background-color: #1a1e21;
    &:hover{
        border-color: #1a1e21;
        color: #1a1e21;
    }
`
export const AuthError = styled.div`
    width: 100%;
    margin-top: .25rem;
    font-size: .875em;
    color: #dc3545;
    display: block;
    margin-bottom: .5rem;
`
export const AuthInput = styled(FormControl)`
    &.invalid{
        border-color: #dc3545;
        padding-right: calc(1.5em + .75rem);
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-position: right calc(.375em + .1875rem) center;
        background-size: calc(.75em + .375rem) calc(.75em + .375rem);
    }
`
export const AuthLink = styled(NavLink)`
    float: right;
    color: #0a58ca;
    display: block;
    padding: .5rem 1rem;
    text-decoration: none;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out;
`