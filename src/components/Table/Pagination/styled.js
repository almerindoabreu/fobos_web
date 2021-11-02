import styled from "styled-components"


export const WrapperPagination = styled.div`
   display: inline-block;
`

export const PaginationItem = styled.a`
  background-color: ${props => (props.selectedItem ?  "#4CB5AB" : "none")};
  color: ${props => (props.selectedItem ?  "#FFF" : "#000")};
  float: left;
  padding: 8px 10px;
  text-decoration: none;
  cursor: pointer;
`