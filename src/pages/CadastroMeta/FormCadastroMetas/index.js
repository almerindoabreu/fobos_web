import React, { useState, useEffect } from 'react'
import moment from "moment";
import Title from "../../../components/Title"
import ButtonForm from "../../../components/ButtonForm"
import Feedback from "../../../components/Feedback"
import Deadline from "../../../components/Deadline"
import Line from "../../../components/Line"

import {Goal} from './../goal'

import { Form, Col, Row } from 'react-bootstrap';
import * as S from "./styled";
import api from "../../../services/api";

const FormCadastroMetas = (props) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resposta, setResposta] = useState({
    show: false,
    feedback: '',
    text: '',
  })

  const [goal, setGoal] = useState(Goal);

  useEffect (() => {
    //indexUsers();
    setGoal(props.goal);
    setUsers(props.users);
    console.log("useEffect");
  }, [props.users, props.goal])

  const indexUsers = async () => {
    const response = await api.get("/api/user/users");
    setUsers(response.data);
  }

  const CloseModal = async () => {
    console.log("Alô!")
    props.setOpenModal(false);
  } 

  window.onclick = function(event) {
    if(event.target.id == 'modal'){
      props.setOpenModal(false);
    }
  }

  const saveGoal = async () => {
    setLoading(true);
    const response = await api.post("/api/goal/save",  goal );
    setResposta(response.data);

    setLoading(false);
    emptyAfterSave();
  }

  const emptyAfterSave = async () => {
    setGoal(Goal);
  }

  return(
  <S.FormModal id="modal" className="modal" visible={props.visible}>

  <S.FormModalWrapper class="modal-content">
    <S.FormModalClose onClick={CloseModal}>&times;</S.FormModalClose>
    <S.ModalWrapper>
      <Title title={"Ações e Metas"} size={42}/>
      <Feedback resposta={resposta} setResposta={setResposta}/>
      <Line />
      <S.FormDiv >
        <Form className="mb-2">
          <Form.Row>
            <Form.Group as={Col} md="4" controlId="title">
              <Form.Label>Título</Form.Label>
              <Form.Control type="text" value={goal.title}
              onChange={event => {
                setGoal({...goal, title: event.target.value})
              }}
              />
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="user">
              <Form.Label>Usuário</Form.Label>
              <Form.Control type="text" as="select"
                value={goal.userName}
                onChange={event => {
                  setGoal({...goal, userName: event.target.value , fkUser: parseInt(event.target.options[event.target.options.selectedIndex].getAttribute('data-key'))})
                }}>
                  <option>Selecione uma opção</option>
                  {users.map((user) => (
                    <option key={user.id} data-key={user.id}>{user.name}</option>
                    ))
                  }
              </Form.Control> 
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} md="4" controlId="date">
              <Form.Label>Prazo</Form.Label>
              <Form.Control type="date"
                value={moment(goal.deadline).format("YYYY-MM-DD")}
                onChange={event => {
                  setGoal({...goal, deadline: event.target.value});
                }}>
                  
              </Form.Control> 
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} md="8" controlId="text">
              <Form.Label>Descrição</Form.Label>
              <Form.Control type="text" as="textarea" rows={10}
                value={goal.description}
                onChange={event => {
                  setGoal({...goal, description: event.target.value});
                }}>
                  
              </Form.Control> 
            </Form.Group>
          </Form.Row>
          
          <Form.Row as={Col} md="2">
            <ButtonForm
              title={"Salvar"}
              loading={loading}
              onClick={saveGoal}
              />
          </Form.Row>
        </Form>

      </S.FormDiv>
    </S.ModalWrapper>
  </S.FormModalWrapper>

</S.FormModal>
);
}

export default FormCadastroMetas;