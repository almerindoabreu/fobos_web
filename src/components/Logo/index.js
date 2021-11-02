import React from "react";
import * as S from "./styled"

const Logo = (props) => {
  return (
    <S.LogoWrapper headerMode={props.headerMode}>
      <S.Title headerMode={props.headerMode}>{"Fobos"}</S.Title>
      <S.SubTitle headerMode={props.headerMode}>{"Controle de Gastos"}</S.SubTitle>

    </S.LogoWrapper>
  );
}

export default Logo;