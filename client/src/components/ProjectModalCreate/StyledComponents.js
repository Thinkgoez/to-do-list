import styled, { keyframes } from 'styled-components'

const show = keyframes`
  0% {
    transform: translate(0,-50px);
  }
  100% {
    transform: translate(0);
  }
`

export const ModalWrapper = styled.div`
    display: block;
    padding-left: 17px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3070;
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
    outline: 0;
    background-color: rgba(0,0,0,.5);

`
export const ModalDialog = styled.div`

    visibility: visible;
    position: relative;
    width: auto;
    max-width: 500px;
    margin: 1.75rem auto;
    pointer-events: none;

    animation: .3s ${show} ease-out;
`
export const ModalContent = styled.div`
    z-index: 3071;
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    pointer-events: auto;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0,0,0,.2);
    border-radius: .3rem;
    outline: 0;
    color: #000
`
export const ModalHeader = styled.div`
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1rem;
    border-bottom: 1px solid #dee2e6;
    border-top-left-radius: calc(.3rem - 1px);
    border-top-right-radius: calc(.3rem - 1px);
`
export const ModalBody = styled.div`
    position: relative;
    flex: 1 1 auto;
    padding: 1rem;
`