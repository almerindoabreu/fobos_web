import styled from "styled-components"
import {Delete} from "@styled-icons/material/Delete"
import {Edit} from "@styled-icons/material/Edit"
import { ArrowFromBottom } from "@styled-icons/boxicons-regular/ArrowFromBottom";
import { ArrowFromTop } from "@styled-icons/boxicons-regular/ArrowFromTop";

export const OrderDesc = styled(ArrowFromBottom)`
  width: 15px;
  height: 15px;
`

export const OrderAsc = styled(ArrowFromTop)`
  width: 15px;
  height: 15px;
`

export const WrapperTable = styled.div`
  margin: 40px 30px 0px 0px;
`

export const WrapperDatas = styled.table`
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
`

export const ControlTable = styled.div`
  display: flex;
  width: 100%;
  height: 50px;

`
export const TableOrderButton = styled.a`
  cursor: pointer;
`

export const THeader = styled.thead`
`
export const TBody = styled.tbody`
`

export const TableThColumnWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

export const TableTh = styled.th`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;

  &.col-action{
   width: 20px;
  }
`

export const TableTr = styled.tr`
  display: ${props => (props.visibleRow ?  "default" : "none")};
  font-size: 14px;
  background-color: ${props => (props.selected ?  "#FFF3B4" : "#fff")};
  
  &:nth-child(even){
    background-color: ${props => (props.selected ?  "#FFF3B4" : "#ddd")};
  }
`

export const TableTd = styled.td`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;

  &.col-action{
   width: 20px;
  }
`

export const WrapperIcon = styled.div`
  display: flex;
  flex-direction: row;
`

export const TableThName = styled.div`
  display: flex;
`

export const TableThWrapperIcons = styled.div`
  display: flex;
  margin: auto 2px auto 2px;
`

export const LinkIcon = styled.a`
  cursor: pointer;
`

export const EditIcon = styled(Edit)`
  width: 30px;
  height: 30px;
  color: #4CB5AB;
`

export const DeleteIcon = styled(Delete)`
  width: 30px;
  height: 30px;
  color: #4CB5AB;

`