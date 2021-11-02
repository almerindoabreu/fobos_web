import styled from "styled-components";

export const DeadlineWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 40px;
`

export const DeadlineHeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

export const DeadlineHeaderDate = styled.div`
  display: flex;
  flex-direction: row;
`
export const DeadlineHeaderDateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`
export const DeadlineHeaderMiddleWrapper = styled.div`
  display: flex;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  background: ${props => (props.status == 'Andamento' ? "#9E0616" : "#4CB5AB")}; ;
`

export const DeadLineBodyGroup = styled.div`
  display: flex;
  flex-direction: row;
`

export const DeadLineBodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  border-right-style: dashed;
  border-right-color: #000;
  border-right-width: ${props => (props.dashedBorder == 'left' ? "3px" : "0px")};
  border-left-style: dashed;
  border-left-color: #000;
  border-left-width: ${props => (props.dashedBorder == 'right' ? "3px" : "0px")};

  padding: 0px 20px 40px 20px;
`

export const DeadlineBodyTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
`
export const DeadlineBodyDescription = styled.textarea`
  display: flex;
  flex-direction: row;
  height: 300px;
  margin: 20px 0px;
  width: 100%;

  color: BLACK;
  border: solid 2 #E4E4E4;
  background: #E4E4E4;
  padding: 20px;
  overflow-y: auto;
  &:focus {
    outline: 0;
    }
`

export const DeadlineBodyDescriptionWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

export const DeadLineGroup = styled.div`
`
export const DeadlineBodyIconsWrapper = styled.div`
  display: flex;
  flex-direction: row;
`
export const DeadLineIcon = styled.div`
  display: flex;
  flex-direction: row;
`

export const DeadLineIconCheck = styled.img`
  cursor: pointer;
  margin-top: 1px;
  width: 35px;
  height: 35px;
`
export const DeadLineIconEdit = styled.img`
  cursor: pointer;
  width: 35px;
  height: 35px;
`