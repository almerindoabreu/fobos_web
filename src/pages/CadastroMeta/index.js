import React, { useState, useEffect } from 'react'
import moment from "moment";
import Title from "../../components/Title"
import ButtonForm from "../../components/ButtonForm"
import Feedback from "../../components/Feedback"
import Deadline from "../../components/Deadline"
import Line from "../../components/Line"
import FormCadastroMetas from "./FormCadastroMetas"

import {Goal} from './goal'

import { Form, Col, Row } from 'react-bootstrap';
import * as S from "./styled"
import api from "../../services/api"


const CadastroMetaPage = () => {

  const [user, setUser] = useState({
    name: ''
  });
  
  const [params, setParams] = useState({
    name: '',
    year: ''
  });
  const [goal, setGoal] = useState(Goal);
  const [users, setUsers] = useState([]);
  const [years, setYears] = useState([]);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [resposta, setResposta] = useState({
    show: false,
    feedback: '',
    text: '',
  })

  useEffect (() => {
    indexUser();
    getYears();
  }, [user])

  const saveGoal = async (goal) => {
    setLoading(true);
    const response = await api.post("/api/goal/save",  goal );
    setResposta(response.data);
    loadGoals();
    setLoading(false);
    emptyAfterSave();
  }

  const indexUser = async () => {
    const response = await api.get("/api/user/users");
    setUsers(response.data);
  }

  const indexGoal = async () => {
    const response = await api.get("/api/goal");
    setGoals(response.data);
  }

  const alterarStatus = async (id) => {
    const responseAlter = await api.put("/api/goal/alterStatus/"+ id);
    const responseShow = await api.get("/api/goal/show/" + params.name + "&" +  params.year);
    setGoals(responseShow.data);
    setResposta(responseAlter.data);
  }
    
  const emptyAfterSave = async () => {
    setUser({
      name: ''
    });
  }

  const editValues = async (id) => {
    const response = await api.get("/api/goal/show/" + id);
    setGoal(response.data, {userName: response.data.user.name});
    modalCadastroMetas();
  }

  const deleteValues = async (id) => {
    const response = await api.put("/api/user/delete/" + id);
    setUser(response.data);
    setResposta(response.data);
  }

  const modalCadastroMetas = () => {
    setOpenModal(true);
  }

  const loadGoals = async () => {
    const response = await api.get("/api/goal/show/" + params.name + "&" +  params.year);
    setGoals(response.data);
  }

  const getYears = async () => {
    let yearInicial = 2019;
    let yearActual = moment().year();
    let yearsArray = [];

    for(let a = yearActual; a >= yearInicial; a-- ){
      yearsArray.push(a);
    }

    setYears(yearsArray);

  }

  return(
    <>
      <FormCadastroMetas visible={openModal} setOpenModal={setOpenModal} goal={goal} users={users}/>
    <S.CadastroBancoWrapper>
      <Title title={"Ações e Metas"} size={42}/>
      <Feedback resposta={resposta} setResposta={setResposta}/>
      <S.FormDiv>
        <Form>
          <Form.Row>
            <Form.Group as={Col} md="4" controlId="usuario">
              <Form.Label>Usuario</Form.Label>
              <Form.Control type="text" as="select"
              value={params.name}
              onChange={event => {
                setParams({...params, name: event.target.value})
              }}>
                <option>Seleciona uma opção</option>
                {users.map((user => (
                  <option>{user.name}</option>
                  )))}
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="usuario">
              <Form.Label>Ano</Form.Label>
              <Form.Control type="text" as="select"
              value={params.year}
              onChange={event => {
                setParams({...params, year: event.target.value})
              }}>
                <option>Seleciona uma opção</option>
                {years.map((year => (
                  <option>{year}</option>
                  )))}
              </Form.Control>
            </Form.Group>

          </Form.Row>
          <Row>
          <Form.Row as={Col} md="2">
            <ButtonForm
              loading={loading}
              title={"Pesquisar"}
              onClick={loadGoals}/>
          </Form.Row>
          <Form.Row as={Col} md="2">
            <ButtonForm
              loading={loading}
              title={"Nova Meta"}
              onClick={modalCadastroMetas}/>
          </Form.Row>
          </Row>
        </Form>
      </S.FormDiv>
      <Line />
      <Deadline goals={goals} editValues={editValues} alterarStatus={alterarStatus}/>

    </S.CadastroBancoWrapper>
    </>
  );
}

export default CadastroMetaPage;