import React, { useState, useEffect } from 'react'
import Title from "../../components/Title"
import Table from "../../components/Table"
import Line from "../../components/Line"
import ButtonForm from "../../components/ButtonForm"
import Feedback from "../../components/Feedback"
import { Form, Col } from 'react-bootstrap';
import  moment from 'moment';
import * as S from "./styled"
import api from "../../services/api"

import {header} from './header'
import {Statement} from './statement'

const CategorizarGastosPage = () => {

  const [statements, setStatements] = useState([]);
  const [categoryTypes, setCategoryTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryType, setCategoryType] = useState({
    name: '',
    categories : []
  });
  
  const [statement, setStatement] = useState(Statement);

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    indexStatement();
    indexCategoryTipe();
  }, [])
    
  const [loading, setLoading] = useState(false);

  const [resposta, setResposta] = useState({
    show: false,
    feedback: '',
    text: '',
  })

  const indexStatement = async () => {
    const response = await api.get("/api/Statement/Statements");
    setStatements(response.data);
  }
  const indexCategoryTipe = async () => {
    const response = await api.get("/api/categoryType/categoryTypes");
    setCategoryTypes(response.data);
  }

  const editValues = async (id) => {
    const response = await api.get("/api/Statement/show/" + id);
    setStatement(response.data);
    console.log(statement)
    // verify if category type is not empty
    if(response.data.category){
      loadCategories(response.data.category.categoryType.id, response.data.category.categoryType.name);
    }else{
      setCategoryType({
        name: '',
        categories: []
      })
    }
    if(checked){
      const response = await api.get("/api/Statement/NoCategory");
      setStatements(response.data);
    }else{
      indexStatement();
    }
  }

  const deleteValues = async (id) => {
    const response = await api.put("/api/Statement/delete/" + id);
    setResposta(response.data);
    indexStatement();
  }

 const loadNoCategory = async () => {
    if(!checked){
      const response = await api.get("/api/Statement/NoCategory");
      setStatements(response.data);
    }else{
      indexStatement();
    }
    setChecked(!checked);
  }

  const saveGastos = async () => {
    setLoading(true);
    const response = await api.post("/api/statement/save",  statement );
    setResposta(response.data);
    if(checked){
      const response = await api.get("/api/Statement/NoCategory");
      setStatements(response.data);
    }else{
      indexStatement();
    }
    setLoading(false);
    emptyAfterSave();
  }
    
  const emptyAfterSave = async () => {
    setStatement(Statement);
  }

  const loadCategories = async (categoryTypeId, categoryTypeName) => {
    const response = await api.get("/api/category/categories/" + categoryTypeId);
    setCategoryType({...categoryType, name: categoryTypeName});
    setCategories(response.data)
  }

  return(
    <S.ImportarExtratoWrapper>
      <Title title={"Categorizar Gastos"} size={42}/>
      <Feedback resposta={resposta} setResposta={setResposta}/>
      <S.FormDiv >
        <Form className="mb-2">
          <Form.Row>
            <Form.Group as={Col} md="4" controlId="nome_pagamento">
              <Form.Label>Nome Pagamento</Form.Label>
              <Form.Control type="text" disabled={true} value={statement.name}/>
            </Form.Group>

            <Form.Group as={Col} md="2" controlId="valores">
              <Form.Label>Valor</Form.Label>
              <Form.Control type="text" disabled={true} value={statement.value}>
              </Form.Control> 
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="tipo_categoria">
              <Form.Label>Tipo da Categoria</Form.Label>
              <Form.Control type="text" as="select"
                value={categoryType.name}
                onChange={event => {
                  loadCategories( 
                    parseInt(event.target.options[event.target.options.selectedIndex].getAttribute('data-key')),
                    event.target.value
                    )
                }}>
                  <option>Selecione uma opção</option>
                  {categoryTypes.map((categoryType) => (
                    <option key={categoryType.id} data-key={categoryType.id}>{categoryType.name}</option>
                    ))
                  }
              </Form.Control> 
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="4" controlId="cartao">
              <Form.Label>Cartão</Form.Label>
              <Form.Control type="text" disabled={true} value={statement.card.name}/>
            </Form.Group>
            <Form.Group as={Col} md="2" controlId="data">
              <Form.Label>Data</Form.Label>
              <Form.Control type="date" disabled={true} value={moment(statement.date).format('YYYY-MM-DD')}/>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="categoria">
              <Form.Label>Categoria</Form.Label>
              <Form.Control type="text" as="select"
                value={(statement.category ? statement.category.name : '')}
                onChange={event => {
                  setStatement({...statement, category: {categoryType: {name: event.target.value}}, fkCategory: parseInt(event.target.options[event.target.options.selectedIndex].getAttribute('data-key'))});
                }}>
                  <option>Selecione uma opção</option>
                  {categories.map((category) => (
                    <option key={category.id} data-key={category.id}>{category.name}</option>
                    ))
                  }
              </Form.Control> 
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="6" controlId="descricao">
              <Form.Label>Descrição</Form.Label>
              <Form.Control type="text" as="textarea" rows="6" 
              value={statement.description}
              onChange={event => setStatement({...statement, description: event.target.value})}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row as={Col} md="2">
            <ButtonForm
              title={"Salvar"}
              loading={loading}
              onClick={saveGastos}
              />
          </Form.Row>
        </Form>

        <Line  />

        <Form.Row>
            <Form.Group as={Col} md="6" controlId="check_categorizar">
              <Form.Check type="checkbox" checked={checked}
                label="Somente Registros sem Categoria" onChange={loadNoCategory}/>
            </Form.Group>
          </Form.Row>

        <Table header={header} datas={statements} action={true} editValues={editValues} deleteValues={deleteValues}/>
      </S.FormDiv>
    </S.ImportarExtratoWrapper>
  );
}

export default CategorizarGastosPage;