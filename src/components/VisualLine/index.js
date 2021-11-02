import React from "react";
import * as S from "./styled";

const VisualLine = (props) => {
  return (
    <S.VisualLineWrapper headerMode={props.headerMode}>
      <S.VisualLineBlue />
      <S.VisualLineRed />
    </S.VisualLineWrapper>
  );
}

export default VisualLine;