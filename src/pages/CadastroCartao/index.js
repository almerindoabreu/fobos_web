import React, { useState, useEffect } from 'react'
import Title from "../../components/Title"
import Table from "../../components/Table"
import ButtonForm from "../../components/ButtonForm"
import Feedback from "../../components/Feedback"
import { Form, Col } from 'react-bootstrap';
import * as S from "./styled"

import api from "../../services/api"
import {header} from './header'
import {Card} from './card'


const CadastroCartaoPage = (props) => {

  const [cards, setCards] = useState([]);
  const [users, setUsers] = useState([]);
  const [banks, setBanks] = useState([]);
  const [card, setCard] = useState(Card);

  const [loading, setLoading] = useState(false);

  const [resposta, setResposta] = useState({
    show: false,
    feedback: '',
    text: '',
  })

  useEffect (() => {
    indexCard();
  }, [card])

  useEffect (() => {
    
    indexBank();
    indexUser();
  }, [])

  const saveCard = async () => {
    setLoading(true);
    const response = await api.post("/api/card/save",  card );
    setResposta(response.data);
    indexCard();
    setLoading(false);
    emptyAfterSave();
  }

  const indexBank = async () => {
    const response = await api.get("/api/bank/banks");
    setBanks(response.data);
  }

  const indexUser = async () => {
    const response = await api.get("/api/user/users");
    setUsers(response.data);
  }

  const indexCard = async () => {
    const response = await api.get("/api/card/cards");
    setCards(response.data);
  }

  const emptyAfterSave = async () => {
    setCard(Card);
  }

  const editValues = async (id) => {

    const response = await api.get("/api/card/cards/" + id);
    setCard(response.data, {bank: response.data.bank.name});
    //indexCard();
  }

  const deleteValues = async (id) => {
    const response = await api.put("/api/card/delete/" + id);
    setResposta(response.data);
    indexCard();
  }

  return(
    <S.CadastroBancoWrapper>
      <Title title={"Cadastro de Cartão"} size={42}/>
      <Feedback resposta={resposta} setResposta={setResposta}/>
      <S.FormDiv>
        <Form>
          <Form.Row>
            <Form.Group as={Col} md="4" controlId="cartao_nome">
              <Form.Label>Nome no Cartão</Form.Label>
              <Form.Control type="text" 
              value={card.name}
              onChange={event => {
                setCard({...card, name: event.target.value})
              }}
              />
            </Form.Group>

            <Form.Group as={Col} md="2" controlId="agencia">
              <Form.Label>Agencia</Form.Label>
              <Form.Control type="text"
                value={card.agency}
                onChange={event => {
                  setCard({...card, agency: event.target.value})
                }}
                />
            </Form.Group>

            <Form.Group as={Col} md="2" controlId="conta">
              <Form.Label>Conta</Form.Label>
              <Form.Control type="text"
                value={card.account}
                onChange={event => {
                  setCard({...card, account: event.target.value})
                }}
                />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} md="4" controlId="banco">
              <Form.Label>Banco</Form.Label>
              <Form.Control type="text" as="select"
              value={card.bank.name}
              onChange={event => {
                setCard({...card, bank: {name: event.target.value}, fkBank: parseInt(event.target.options[event.target.options.selectedIndex].getAttribute('data-key'))});
              }}>
                <option>Selecione uma opção</option>
                {banks.map((bank) => (
                  <option key={bank.id} data-key={bank.id}>{bank.name}</option>
                  ))
                }
                </Form.Control>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="usuario">
              <Form.Label>Proprietário do Cartão</Form.Label>
              <Form.Control type="text" as="select"
              value={card.user.name}
              onChange={event => {
                setCard({...card, user: {name: event.target.value}, fkUser: parseInt(event.target.options[event.target.options.selectedIndex].getAttribute('data-key'))});
              }}>
                <option>Selecione uma opção</option>
                {users.map((user) => (
                  <option key={user.id} data-key={user.id}>{user.name}</option>
                  ))
                }
                </Form.Control>
            </Form.Group>

          </Form.Row>

          <Form.Row as={Col} md="2">
            <ButtonForm
              title={"Salvar"}
              loading={loading}
              onClick={saveCard}/>
          </Form.Row>
        </Form>
      </S.FormDiv>

      <Table header={header} datas={cards} action={true} editValues={editValues} deleteValues={deleteValues}/>

    </S.CadastroBancoWrapper>
  );
}

export default CadastroCartaoPage;