import styled from "styled-components"

export const IGPWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 20px 0px;
`

export const WrapperLegend = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
export const LegendText = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const LegendWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0px 20px 0px;
`

export const LegendItemGroup = styled.div`
  display: flex;
  flex-direction: row;
  margin: 2px 0px 2px 0px;
`

export const LegendCategory = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
`

export const LegendColor = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  width: 15px;
  height: 15px;
  background-color: ${props => 
    (props.colorIndex == 0 ? "#10B2AE" : 
    props.colorIndex == 1 ? "#9E0616" : 
    "#120A8F")};
`

export const LegendRemoveCategory = styled.a`
  margin-left: 15px;
  cursor: pointer;
  `

export const ResumoTitle = styled.div`
`
export const ResumoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0px 20px 0px;
`

export const ResumoWrapperGroup = styled.div`
  display: flex;
  flex-direction: row;
`

export const ResumoGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 10px 0px;
`

export const ResumeWrapperCategory = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2px 0px;
`

export const GroupResumeCategory = styled.div`
  display: flex;
  flex-direction: row;
  margin: 4px 0px;
`

export const ResumeCategory = styled.div`
  display: flex;
  flex-direction: row;
  width: 200px;
  margin-right: 20px;
`

export const ResumeValue = styled.div`
  display: flex;
  flex-direction: row;
`