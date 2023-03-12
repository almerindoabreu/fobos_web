import React from "react";
import _ from "lodash";
import moment from "moment";

import * as S from "./../styled"

const Row = (props) => {

  const editRow = (id) => {
    props.editValues(id); //função para chamar o metodo get da api para pesquisar a entidade da tabela por id

    // movimento na barra de rolagem da página
    // setTimeout(function() { 
    //   window.scroll({
    //     top: 21,
    //     behavior: "smooth"
    //   });
    //  }, 100);
  }

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
          <S.LinkIcon onClick={() => editRow(props.row.id)}>
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


