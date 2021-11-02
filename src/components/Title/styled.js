import styled from "styled-components"


export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: ${props => (props.divSize - (props.divSize / 6)) + "px"};
`
export const TitleVisualLineBlue = styled.div`
  display: flex;
  width: 5px;
  height: 100%;
  background: #10B2AE;
  margin: 0px  ${props => (props.lineSize / 6) + "px"};
`
export const TitleVisualLineRed = styled.div`
  display: flex;
  width: 5px;
  height: 100%;
  background: #9E0616;
  margin: 0px  ${props => (props.lineSize / 6) + "px"};
`
export const Title = styled.p`
  font-family: "Rationale-Regular", Arial, Helvetica, sans-serif;
  font-style: normal;
  color: #141529;
  font-size: ${props => props.titleSize + "px"};
  margin-left: ${props => (props.titleSize / 5) + "px"};;
`
