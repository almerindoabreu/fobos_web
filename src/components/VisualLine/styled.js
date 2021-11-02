import styled from "styled-components"

export const VisualLineWrapper = styled.div`
  display: ${props => (props.headerMode == 'high-mode' ? "flex" : "none")};
  flex-direction: column;
  width: 100%;
  margin: 28px 0px ;
`
export const VisualLineBlue = styled.div`
  display: flex;
  width: 100%;
  height: 5px;
  background: #10B2AE;
  margin: 6px 0px ;
`
export const VisualLineRed = styled.div`
  display: flex;
  width: 100%;
  height: 5px;
  background: #9E0616;
  margin: 6px 0px ;
`