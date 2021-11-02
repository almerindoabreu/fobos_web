import React, { useEffect, useState} from "react";
import _ from "lodash";

import * as S from "./styled"

import TableHeader from "./TableHeader"
import TableBody from "./TableBody"
import Pagination from "./Pagination"

const Table = (props) => {
  const [pageNumer, setPageNumber] = useState(0);
  const [pageSelected, setPageSelected] = useState(1);
  const [dataSet, setDataSet] = useState([]);

  useEffect(() => {
    setDataSet(props.datas);  
  })

  useEffect(() => {
    countPages(props.datas);  
  })

  const countPages = async (data) => {
    setPageNumber( data.length / 25);
  }

  function dynamicSort(property, type) {

    var sortOrder = type == "ASC" ? 1 : -1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        var result = ( ((a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0));
                                       
        return result * sortOrder;
      }
  }
    
  return (
    <S.WrapperTable>
      <S.ControlTable>
        <Pagination pageSelected={pageSelected}/>
      </S.ControlTable>
      <S.WrapperDatas>
        <S.THeader>
          <TableHeader header={props.header} headerAction={props.action} dataSet={dataSet} 
            setDataSet={setDataSet} dynamicSort={dynamicSort}/>
        </S.THeader>
        <S.TBody>
          <TableBody rowPerPage={25} pageSelected={pageSelected} datas={dataSet} header={props.header} bodyAction={props.action} editValues={props.editValues} deleteValues={props.deleteValues}/>
        </S.TBody>
      </S.WrapperDatas>
    </S.WrapperTable>
  );
}

export default Table;