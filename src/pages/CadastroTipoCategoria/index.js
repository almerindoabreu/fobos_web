import React, { useState, useEffect }  from 'react'
import Title from "../../components/Title"
import ButtonForm from "../../components/ButtonForm"
import Feedback from "../../components/Feedback"
import Table from "../../components/Table"

import { Form, Col } from 'react-bootstrap';
import * as S from "./styled"

import api from "../../services/api"
import {header} from './header'

const CadastroTipoCategoriaPage = (props) => {
  const [categoryTypes, setCategoryTypes] = useState([]);
  const [categoryType, setCategoryType] = useState({
    name: '',
    typeStatement: ''
  });
  const [resposta, setResposta] = useState({
    show: false,
    feedback: '',
    text: '',
  })

  const [loading, setLoading] = useState(false);

  useEffect (() => {
    indexCategoryType();
  }, [categoryType])

  const saveCategoryType = async () => {
    setLoading(true);
    const response = await api.post("/api/categoryType/save",  categoryType );
    setResposta(response.data);
    setLoading(false);
    emptyAfterSave();
  }

  const indexCategoryType = async () => {
    const response = await api.get("/api/categoryType/categoryTypes");
    setCategoryTypes(response.data);
  }
  
  const emptyAfterSave = async () => {
    setCategoryType({
      name: '',
      typeStatement: ''
    });
  }

  const editValues = async (id) => {

    props.setLoadingScreen(true);
    var start = new Date().getTime();
    const response = await api.get("/api/categoryType/show/" + id);
    setCategoryType(response.data);
    indexCategoryType();

    var end = new Date().getTime();
    var time = end - start;
    alert('Execution time: ' + time);

    props.setLoadingScreen(false);
  }

  const deleteValues = async (id) => {
    const response = await api.put("/api/categoryType/delete/" + id);
    setCategoryType(response.data);
    setResposta(response.data);
    indexCategoryType();
  }


  
  return(
    <S.CadastroTipoCategoriaWrapper>
      <Title title={"Cadastro de Tipo de Categoria"} size={42}/>
      <Feedback resposta={resposta} setResposta={setResposta}/>
      <S.FormDiv>
        <Form>
          <Form.Row>
            <Form.Group as={Col} md="4" controlId="tipo_categoria_name">
              <Form.Label>Tipo Categoria</Form.Label>
              <Form.Control type="text" 
              value={categoryType.name}
              onChange={event => {
                setCategoryType({...categoryType, name: event.target.value})
              }}/>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="tipo_categoria_tipo_extrato">
              <Form.Label>Tipo de Extrato</Form.Label>
              <Form.Control type="text" as="select"
              value={categoryType.typeStatement}
              onChange={event => {
                setCategoryType({...categoryType, typeStatement: event.target.value})
              }}>
                <option>Selecione uma opção</option>
                <option>Gasto</option>
                <option>Neutro</option>
                <option>Renda</option>
                </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row as={Col} md="2">
            <ButtonForm
              title={"Salvar"}
              loading={loading}
              onClick={saveCategoryType} />
          </Form.Row>
        </Form>
      </S.FormDiv>

      <Table header={header} datas={categoryTypes} action={true} editValues={editValues} deleteValues={deleteValues}/>


    </S.CadastroTipoCategoriaWrapper>
  );
}

export default CadastroTipoCategoriaPage;