import styled from "styled-components";
import { AlertTriangle } from "@styled-icons/evaicons-solid/AlertTriangle"

export const AlertDataWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0px 20px 0px 20px;
  background-color: red;
  height: 60px;
  padding: 10px;
`

export const AlertDataIconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 50px;
`

export const AlertDataIcon = styled(AlertTriangle)`
  width: 25px;
  height: 25px;
  color: white;
  margin: auto;
`

export const AlertTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
`
export const AlertText = styled.div`
  display: flex;
  flex-direction: row;
  margin: 2px;
`