import React from "react";
import _ from "lodash";
import moment from "moment";

import * as S from "./../styled"

const Row = (props) => {
  
  return (
    <>
      {props.header.map((h, i) => {
        if(h.type == 'date-time'){
          return (
            <S.TableTd key={i}>{moment(_.get(props.row, h.field)).format('DD/MM/YYYY HH:MM:SS')}</S.TableTd>
          );
        }else if (h.type == 'date'){
          return (
            <S.TableTd key={i}>{moment(_.get(props.row, h.field)).format('DD/MM/YYYY')}</S.TableTd>
          );
        }else if (h.type == 'money'){
          return (
            <S.TableTd key={i}>{_.get(props.row, h.field).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</S.TableTd>
          );
        }else{
          return (
            <S.TableTd key={i}>{_.get(props.row, h.field)}</S.TableTd>
          );
        }
      })}
      {props.action ?
        <S.TableTd className="col-action">
          <S.WrapperIcon>
          <S.LinkIcon onClick={() => props.editValues(props.row.id)}>
            <S.EditIcon />
          </S.LinkIcon>
          <S.LinkIcon onClick={() => props.deleteValues(props.row.id)}>
            <S.DeleteIcon />
          </S.LinkIcon>
          </S.WrapperIcon>
        </S.TableTd>
      : " "}
    </>
  );
  }

export default Row;


