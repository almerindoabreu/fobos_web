import React, { useState, useEffect } from 'react'
import Title from "../../components/Title"
import ButtonForm from "../../components/ButtonForm"
import Feedback from "../../components/Feedback"
import Table from "../../components/Table"

import { Form, Col } from 'react-bootstrap';
import * as S from "./styled"
import api from "../../services/api"

import {header} from './header'

const CadastroUsuarioPage = () => {

  const [user, setUser] = useState({
    name: ''
  });
  
  const [users, setUsers] = useState([]);
  
  const [loading, setLoading] = useState(false);

  const [resposta, setResposta] = useState({
    show: false,
    feedback: '',
    text: '',
  })

  useEffect (() => {
    indexUser();
  }, [user])

  const saveUser = async () => {
    setLoading(true);
    const response = await api.post("/api/user/save",  user );
    setResposta(response.data);
    indexUser();
    setLoading(false);
    emptyAfterSave();
  }

  const indexUser = async () => {
    const response = await api.get("/api/user/users");
    setUsers(response.data);
  }
    
  const emptyAfterSave = async () => {
    setUser({
      name: ''
    });
  }

  const editValues = async (id) => {
    const response = await api.get("/api/user/show/" + id);
    setUser(response.data);
  }

  const deleteValues = async (id) => {
    const response = await api.put("/api/user/delete/" + id);
    setUser(response.data);
    setResposta(response.data);
  }

  return(
    <S.CadastroBancoWrapper>
      <Title title={"Cadastro de Usuário"} size={42}/>
      <Feedback resposta={resposta} setResposta={setResposta}/>
      <S.FormDiv>
        <Form>
          <Form.Row>
            <Form.Group as={Col} md="4" controlId="usuario">
              <Form.Label>Proprietário do Cartão</Form.Label>
              <Form.Control type="text" 
              value={user.name}
              onChange={event => {
                setUser({...user, name: event.target.value})
              }}/>
            </Form.Group>

          </Form.Row>
          <Form.Row as={Col} md="2">
            <ButtonForm
              loading={loading}
              title={"Salvar"}
              onClick={saveUser}/>
          </Form.Row>
        </Form>
      </S.FormDiv>

      <Table header={header} datas={users} action={true} editValues={editValues} deleteValues={deleteValues}/>

    </S.CadastroBancoWrapper>
  );
}

export default CadastroUsuarioPage;