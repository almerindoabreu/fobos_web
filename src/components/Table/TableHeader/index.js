import React, {useState} from "react";
import * as S from "../styled"

const TableHeader = ({header, headerAction, dataSet, setDataSet, dynamicSort}) => {
  const [sortedResults, setSortedResults] = useState([]);

  const orderBy = (field, type) => {
    setSortedResults(dataSet.sort(dynamicSort(field, type)));
    setDataSet(sortedResults);
    console.log(dataSet);
    setSortedResults([]);
  }

  return (
    <S.TableTr visibleRow={true}>
      {header.map((h, i) => {
        return ( 
          <S.TableTh key={i}>
            <S.TableThColumnWrapper>
              <S.TableThWrapperIcons>
                <S.TableOrderButton onClick={() => orderBy(h.field, "ASC")}><S.OrderAsc /></S.TableOrderButton>
                <S.TableOrderButton onClick={() => orderBy(h.field, "DES")}><S.OrderDesc /></S.TableOrderButton>
              </S.TableThWrapperIcons>
              <S.TableThName >{h.columnName}</S.TableThName>
            </S.TableThColumnWrapper>
          </S.TableTh>
        );
      })}
      {headerAction ?
        <S.TableTh className={"col-action"} key={9999999}>{"Ação"}</S.TableTh> : ""
      }
    </S.TableTr>
  );
}

export default TableHeader;