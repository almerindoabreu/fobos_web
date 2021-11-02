import React from "react";
import * as S from "./styled"

import Logo from "../Logo";
import VisualLine from "../VisualLine";

const Header = (props) => {
  return (
    <S.HeaderWrapper headerMode={props.headerMode}>
      <S.HeaderLogo href="/">
        <Logo headerMode={props.headerMode} />
      </S.HeaderLogo>
      <S.HeaderLines >
        <VisualLine headerMode={props.headerMode}/>
      </S.HeaderLines>
    </S.HeaderWrapper>
  );
}

export default Header;