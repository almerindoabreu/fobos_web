import React, {useEffect, useState} from "react";
import * as S from "./styled"
import load from "../../image/loading-icon.gif"

const LoadAction = ({activated }) => {
  const [isLoading, setLoading] = useState();

 useEffect (() => {
   if(activated){
      setLoading(activated);
   }else{
      setTimeout(function() { setLoading(activated); }, 1000);
   }
 }, [activated]);

  return (
    <S.LoadActionWrapper activated={isLoading}>
      <S.LoadIconWrapper>
       <S.LoadIcon src={load} />
      </S.LoadIconWrapper> 
    </S.LoadActionWrapper>
  );
}

export default LoadAction;