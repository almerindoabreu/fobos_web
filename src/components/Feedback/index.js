import React, { useEffect } from "react";


import * as S from "./styled"

const Feedback = (props) => {
  
  useEffect(() => {
    if(props.resposta.show == true){
      console.log("2");

      const timer = setTimeout(() => props.setResposta({...props.resposta, show: false}), 5000);
      return () => { // Return callback to run on unmount.
          window.clearInterval(timer);
        console.log("3");

        };
      }
  }, [props.resposta.show]);


  return (
    <S.AlertStyled 
      show={(props.resposta.show) ? true : false}
      variant={props.resposta.feedback == "success" ? "success" : "danger"}>
      {props.resposta.text}
    </S.AlertStyled>
  );
}

export default Feedback;