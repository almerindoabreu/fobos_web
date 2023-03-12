import styled from "styled-components";

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: ${props => (props.headerMode == 'high-mode' ? "180px" : "50px")};
  width: 100%;
  position: ${props => (props.headerMode == 'high-mode' ? "relative" : "fixed")};
  z-index: 9999;
  top: 0;
  background-color: #141529;
`

export const HeaderLogo = styled.a`
  display: flex;
  flex-direction: row;

  &:hover{
    text-decoration: none;
    cursor: pointer;
  }
`

export const HeaderLines = styled.div`
  display: flex;
  flex-direction: row;
`