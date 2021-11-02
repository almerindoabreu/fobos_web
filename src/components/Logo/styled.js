import styled from "styled-components"


export const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: right;
  margin: 40px 100px;
  margin-bottom: ${props => (props.headerMode == 'high-mode' ? "40px" : "0px")};
  margin-top: ${props => (props.headerMode == 'high-mode' ? "40px" : "0px")};
`

export const Title = styled.p`
  font-family: "Saros-Regular", Arial, Helvetica, sans-serif;
  font-style: normal;
  text-align: right;
  color: #141529;
  font-size: ${props => (props.headerMode == 'high-mode' ? "42px" : "22px")};
  margin-left: 12px;
  margin-bottom: ${props => (props.headerMode == 'high-mode' ? "16px" : "0px")};;
  line-height: 50px;
  color: #FFF3B4;
`

export const SubTitle = styled.p`
  display: ${props => (props.headerMode == 'high-mode' ? "flex" : "none")}; 
  font-family: "Rationale-Regular", Arial, Helvetica, sans-serif;
  font-style: normal;
  color: #141529;
  font-size: 24px;
  margin-left: 12px;
  line-height: 28px;
  color: #FFF3B4;
`
