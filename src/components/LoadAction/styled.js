import styled from "styled-components"

export const LoadActionWrapper = styled.div`
  display: flex;

  visibility: ${props => props.activated ? 'visible' : 'hidden'};

  flex-direction: column;

  position: absolute;
  width: 100%;
  height: 100%;
  left: 0px; top: 0px;
  z-index: 99999;
  background-color: #141529cc;
`

export const LoadIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100px;
  height: 100px;
  margin: auto;
`
export const LoadIcon = styled.img`
`

