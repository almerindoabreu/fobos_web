import React, { useEffect, useState} from "react";

import * as S from "./styled"

import Header from "../Header"
import Menu from "../Menu"

const Layout = ({children}) => {

  const [headerMode, setHeaderMode] = useState("high-mode");

  const listenScrollEvent = e => {
    if (window.scrollY > 20) {
      setHeaderMode('low-mode');
    } else {
      setHeaderMode('high-mode');
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);
  
    return () =>
      window.removeEventListener('scroll', listenScrollEvent);
  }, []);

  return(
    <S.LayoutWrapper headerMode={headerMode}>
      <Header headerMode={headerMode}/>
      <S.LayoutBodyWrapper>
        {children}  
        <Menu />
      </S.LayoutBodyWrapper>
    </S.LayoutWrapper>
  );
}

export default Layout;