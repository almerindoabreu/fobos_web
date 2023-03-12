import React,  { useState, useEffect } from 'react'
import Title from "../../components/Title"
import Table from "../../components/Table"
import ButtonForm from "../../components/ButtonForm"
import Feedback from "../../components/Feedback"
import { Form, Col, Row } from 'react-bootstrap';
import * as S from "./styled"
import api from "../../services/api"

import moment from 'moment';
import XLSX from 'xlsx';
import { make_cols } from './MakeColumns';
import  {SheetJSFT}  from './types';
import ExcelDateFormatter from "../../helper/excelDateFormatter.js";

import {header} from './header'

const ImportarExtratoPage = () => {

  const [file, setFile] = useState({});
  const [data, setData] = useState({rows: [], cols: []});

  const [card, setCard] = useState({});
  const [cards, setCards] = useState([]);
  const [Statements, setStatements] = useState([]);
  const [cardSelected, setCardSelected] = useState({value: '', name: '', idCard: ''});
    
  const [loading, setLoading] = useState(false);

  const [resposta, setResposta] = useState({
    show: false,
    feedback: '',
    text: '',
  })

  useEffect(() => {
    indexCard();
    indexStatement();
 }, []);

  useEffect(() => {
    console.log(Statements);
 }, [Statements]);

 const indexStatement = async () => {
  const response = await api.get("/api/Statement/Statements");
  setStatements(response.data);
}

const indexCard = async () => {
  const response = await api.get("/api/card/cards");
  setCards(response.data);
}

const deleteValues = async (id) => {
  const response = await api.put("/api/Statement/delete/" + id);
  setResposta(response.data);
  indexStatement();
}

const loadCard = async (id) => {
  const response = await api.get("/api/card/cards/" + id);
  setCardSelected(response.data.bank.name + ' - ' + card.name + card.agency + " - " + card.account);
  //setCardSelected(response.data);
  //{card.bank.name + " - " + card.name + " - " + card.agency + " - " + card.account}
}

  const handleImport = async () => {
    const response = await api.post("/api/Statement/Bulk", Statements );
    setResposta(response.data);
  }

  const handleChange = (e) => {
    const files = e.target.files;
    if (files && files[0]) setFile(files[0]);
  }
 
  const handleLoad = () => {
    /* Boilerplate to set up FileReader */
    
    const reader = new FileReader();
    const excelFormatter = new ExcelDateFormatter();
    const rABS = !!reader.readAsBinaryString;
 
    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA : true });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const dataFile = XLSX.utils.sheet_to_json(ws, {defval:""});
      /* Update state */
      let StatementsArray = [];
      dataFile.map(data => {
        //let newDate = excelFormatter.excelDateToDate(data.date);
        //console.log("moment(data.date ,'DD/MM/YYYY')");
        //console.log(newDate);
        StatementsArray.push({
          name: data.name,
          description: data.description,
          date: moment(data.date, "DD/MM/YYYY"),
          value: data.value,
          fkCard: parseInt(cardSelected.idCard),
          card: cardSelected,
        })
      })
      setStatements(StatementsArray);
      setResposta({
        show: true,
        feedback: 'success',
        text: 'Leitura do arquivo realizado com sucesso!',
      });
    }

    if (rABS) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsArrayBuffer(file);
    };
  }
 
  return(
    <S.ImportarExtratoWrapper>
      <Title title={"Importar Extrato"} size={42}/>
      <Feedback resposta={resposta} setResposta={setResposta}/>
      <S.FormDiv>
        <Form>
          <Form.Row>
            <Form.Group as={Col} md="5" controlId="importar_arquivo">
              <Form.Label>Importar Arquivo</Form.Label>
              <Form.Control type="file" accept={SheetJSFT} onChange={handleChange}/>
            </Form.Group>

            <Form.Group as={Col} md="6" controlId="card">
              <Form.Label>Cartão Crédito / Débito </Form.Label>
              <Form.Control type="text" as="select"
                value={cardSelected.value}
                onChange={event => {
                  setCardSelected({
                    value: event.target.value, 
                    name: event.target.value.split(" - ")[1],
                    idCard: parseInt(event.target.options[event.target.options.selectedIndex].getAttribute('data-key'))
                  });
                }}>
                <option>{"Preenche uma opção"}</option>
                {cards.map(card => {
                  return (
                    <option key={card.id} data-key={card.id} name={card.name}>
                      {card.bank.name + " - " + card.name + " - " + card.agency + " - " + card.account}
                    </option>
                  );
                })
                }
              </Form.Control> 
            </Form.Group>
          </Form.Row>
          <Row>
            <Form.Row as={Col} md="2">
              <ButtonForm
                loading={loading}
                title={"Ler arquivo"}
                onClick={handleLoad}/>
            </Form.Row>
            <Form.Row as={Col} md="2">
              <ButtonForm
                loading={loading}
                title={"Importar"}
                onClick={handleImport}/>
            </Form.Row>
          </Row>
        </Form>

        <Table header={header} datas={Statements}/>
      </S.FormDiv>
    </S.ImportarExtratoWrapper>
  );
}

export default ImportarExtratoPage;