import React, { useState, useEffect } from 'react'
import Title from "../../components/Title"
import ButtonForm from "../../components/ButtonForm"
import Feedback from "../../components/Feedback"
import Table from "../../components/Table"
import { Form, Col, Spinner } from 'react-bootstrap';
import * as S from "./styled"

import api from "../../services/api"
import {header} from './header'

const CadastroBancoPage = () => {

  const [bank, setBank] = useState({
    name: ''
  });

  const [banks, setBanks] = useState([]);

  const [resposta, setResposta] = useState({
    show: false,
    feedback: '',
    text: '',
  })

  const [loading, setLoading] = useState(false);

  useEffect (() => {
    indexBank();
  }, [bank])

  const saveBank = async () => {
    setLoading(true);
    const response = await api.post("/api/bank/save",  bank );
    setResposta(response.data);
    indexBank();
    setLoading(false);
    emptyAfterSave();
  }

  const indexBank = async () => {
    const response = await api.get("/api/bank/banks");
    setBanks(response.data);
  }

  const emptyAfterSave = async () => {
    setBank({name: ''});
  }

  const editValues = async (id) => {
    const response = await api.get("/api/bank/banks/" + id);
    setBank(response.data);
    indexBank();
  }

  const deleteValues = async (id) => {
    const response = await api.put("/api/bank/delete/" + id);
    setBank(response.data);
    setResposta(response.data);
    indexBank();
  }

  return(
    <S.CadastroBancoWrapper>
      <Title title={"Cadastro de Banco"} size={42}/>
      <Feedback resposta={resposta} setResposta={setResposta}/>
      <S.FormDiv>
        <Form>
          <Form.Row>
            <Form.Group as={Col} md="4" controlId="bank_name">
              <Form.Label>Nome do banco</Form.Label>
              <Form.Control type="text" 
                value={bank.name}
                onChange={event => {
                  setBank({...bank, name: event.target.value})
                }}
                />
            </Form.Group>

          </Form.Row>
          <Form.Row as={Col} md="3">
            <ButtonForm onClick={saveBank}
              loading={loading}
              title={"Salvar Banco"}>
                </ButtonForm>
          </Form.Row>
        </Form>
      </S.FormDiv>

      <Table header={header} datas={banks} action={true} editValues={editValues} deleteValues={deleteValues}/>

    </S.CadastroBancoWrapper>
  );
}

export default CadastroBancoPage;