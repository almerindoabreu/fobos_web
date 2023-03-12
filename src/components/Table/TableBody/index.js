import React from "react";

import * as S from "./../styled"
import Row from "./row.js"

const TableBody = (props) => {

  return (
    <>
    {props.datas.map((data, i) => {
      return (
        <S.TableTr key={i} id={`table-row-`+ (parseInt(i / 25) + 1)}
            visibleRow={(props.pageSelected == parseInt(i / 25) + 1 ? true : false)}
            selected={(data.id == props.itemSelected ? false : false)}>
          <Row key={i} row={data} header={props.header} 
            action={props.bodyAction} editValues={props.editValues} deleteValues={props.deleteValues}/>
            {console.log(i )}
        </S.TableTr>
        )
      })
    }
    </>
  );
}

export default TableBody;