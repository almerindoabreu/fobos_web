
import styled from "styled-components"

export const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${props => (props.headerMode == 'high-mode' ? "0px" : "120px")};
  min-height: 800px;
`

export const LayoutBodyWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 40px 100px;
`