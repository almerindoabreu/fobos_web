import React, { useEffect, useState } from "react";
import moment from "moment";

import * as S from "./styled"
import api from "../../services/api"

const AlertData = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    indexLastImport();
  }, []);

  const indexLastImport = async () => {
    
    const response = await api.get("/api/Statement/Show/LastImport");
    console.log(response.data);
    formatterAlert(response.data);
  }

  const formatterAlert = async (lastStatements) => {
    let cardNameAux = '';
    let alertsObj = [];

    lastStatements.map(statement => {
      if(cardNameAux != statement.cardName){
        cardNameAux = statement.cardName;
        alertsObj.push(statement);
      }
    })
    console.log(alertsObj);
    setAlerts(alertsObj);
  }

  return (
    <S.AlertDataWrapper visible={alerts == null ? false : true}>
      <S.AlertDataIconWrapper>
        <S.AlertDataIcon />
      </S.AlertDataIconWrapper>
      <S.AlertTextWrapper>
      {alerts.map((alert) => (
        <S.AlertText>
          {`Último relatório importado do cartão de ${alert.cardName} foi no dia ${moment(alert.statementDate).format("DD/MM/YYYY")}`}
        </S.AlertText>
      ))}
      </S.AlertTextWrapper>
    </S.AlertDataWrapper>
  );
}

export default AlertData;