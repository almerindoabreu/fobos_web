import React from "react";
import * as S from "./styled"

import { menu } from "./content"

import Title from "../Title"

const Menu = () => {
  return (
    <S.MenuWrapper>
      <Title title={"Menu"} size={22}/>
      <S.MenuItemWrapper>
      {menu.map((iten, i) => {
        return (
          <S.MenuItem key={i} href={iten.url}>{iten.label}</S.MenuItem>
        );
      })}
      </S.MenuItemWrapper>
    </S.MenuWrapper>
  );
}

export default Menu;