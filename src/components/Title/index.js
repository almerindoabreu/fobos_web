import React from "react";
import * as S from "./styled";

const Title = ({title, size}) => {
  return (
    <S.TitleWrapper divSize={size}>
      <S.TitleVisualLineBlue lineSize={size} />
      <S.TitleVisualLineRed lineSize={size} />
      <S.Title titleSize={size}>
        {title}
      </S.Title>
    </S.TitleWrapper>
  );
}

export default Title;