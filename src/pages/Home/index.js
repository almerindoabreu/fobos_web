import React, { useState, useEffect } from 'react'
import Title from "../../components/Title"
import Table from "../../components/Table"
import ButtonForm from "../../components/ButtonForm"
import Feedback from "../../components/Feedback"
import AlertData from "../../components/AlertData"
import { Form, Col } from 'react-bootstrap';
import  igc  from "../../image/igc.svg";
import  ica  from "../../image/ica.svg";
import  am  from "../../image/am.svg";
//import * as S from "./styled"


const HomePage = () => {


  return(
    <div style={{display: "flex", flexDirection: "column"}}>
    <AlertData />
    <div style={{display: "flex", flexDirection: "column"}}>
    <div style={{display: "flex", flexDirection: "row"}}>
      <a style={{margin: "20px"}} href={"/Graficos"}>
        <img style={{width: 400, height: 200}} src={igc} />
      </a>
      <a style={{margin: "20px"}} href={"/CadastroMeta"}>
        <img style={{width: 400, height: 200}} src={ica} />
      </a>

    </div>
    <div style={{display: "flex", flexDirection: "row"}}>
      <a style={{margin: "20px"}} href={"/CadastroMeta"}>
        <img style={{width: 400, height: 200}} src={am} />
      </a>

    </div>
      </div>
      </div>
  );
}

export default HomePage;