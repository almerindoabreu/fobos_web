import React from "react";
import { Spinner } from 'react-bootstrap';

import * as S from "./styled"

const ButtonForm = ({title, sizeBootstrap, onClick, loading}) => {
  return (
    <S.ButtonStyled sm={3} className="btn-fobos" 
      onClick={onClick} disabled={loading}  style={{paddingRight: (loading ? "30px" : "12px")}}>
        {loading ?
            <Spinner as="span" animation="border" style={{marginBottom: "2px"}}
              size="sm" role="status" aria-hidden="true" />
            : ""
        }
      {" " + title}</S.ButtonStyled>
  );
}

export default ButtonForm;