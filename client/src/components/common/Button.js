import styled from 'styled-components'

export const  Button = styled.button`
    color: #fff;
    cursor: pointer;
    border: 1px solid white;
    padding: .375rem .75rem;
    font-size: 1rem;
    border-radius: .25rem;
    background-color: transparent;
    display: inline-block;
    font-weight: 400;
    line-height: 1.5;
    text-align: center;
    text-decoration: none;
    transition: background-color .15s linear, color .15s linear;
    transition: color .15s linear,background-color .15s linear,border-color .15s linear,box-shadow .15s linear;
    box-sizing: border-box;
    -webkit-user-select: none;
    user-select: none;
    &:hover{
        color: #174082;
        background-color: white;
        transition: background-color .25s linear, color .25s linear;
    }
    &:active{
        border: 2px solid #273956;
        padding: calc(.375rem - 1px) calc(.75rem - 1px);
        border-radius: calc(.25rem + 2px);
    }
`
