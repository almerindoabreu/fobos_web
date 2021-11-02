import React, { useState, useEffect } from 'react'
import Title from "../../components/Title"
import ButtonForm from "../../components/ButtonForm"
import Feedback from "../../components/Feedback"
import Table from "../../components/Table"
import { Form, Col } from 'react-bootstrap';
import * as S from "./styled"

import api from "../../services/api"
import {header} from './header'

const CadastroCategoriaPage = () => {
  const [categories, setCategories] = useState([]);
  const [categoryTypes, setCategoryTypes] = useState([]);
  const [category, setCategory] = useState({
    name: '',
    fkCategoryType: null,
    categoryType: { name: '' }
  });

  const [resposta, setResposta] = useState({
    show: false,
    feedback: '',
    text: '',
  })

  const [loading, setLoading] = useState(false);

  useEffect (() => {
    indexCategory();
  }, [category])

  useEffect (() => {
    indexCategoryType();
  }, [])

  const saveCategory = async () => {
    setLoading(true);
    const response = await api.post("/api/category/save",  category );
    setResposta(response.data);
    indexCategory();
    setLoading(false);
    emptyAfterSave();
  }

  const indexCategoryType = async () => {
    const response = await api.get("/api/categoryType/categoryTypes");
    setCategoryTypes(response.data);
  }
  const indexCategory = async () => {
    const response = await api.get("/api/category/categories");
    setCategories(response.data);
  }

  const emptyAfterSave = async () => {
    setCategory({
      name: '',
      fkCategoryType: null,
      categoryType: { name: '' }
    });
  }

  const editValues = async (id) => {
    const response = await api.get("/api/category/show/" + id);
    setCategory(response.data);
    indexCategory();
  }

  const deleteValues = async (id) => {
    const response = await api.put("/api/category/delete/" + id);
    setResposta(response.data);
    indexCategory();
  }

  return(
    <S.CadastroBancoWrapper>
      <Title title={"Cadastro de Categoria"} size={42}/>
      <Feedback resposta={resposta} setResposta={setResposta}/>
      <S.FormDiv>
        <Form>
          <Form.Row>
            <Form.Group as={Col} md="4" controlId="categoria">
              <Form.Label>Categoria</Form.Label>
              <Form.Control type="text" 
                value={category.name}
                onChange={event =>{
                  setCategory({...category, name: event.target.value})
                }}
              />
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="tipo_categoria">
              <Form.Label>Tipo de Categoria</Form.Label>
              <Form.Control type="text" as="select"
                value={category.categoryType.name}
                onChange={event => {
                  setCategory({...category, categoryType: {name: event.target.value}, fkCategoryType: parseInt(event.target.options[event.target.options.selectedIndex].getAttribute('data-key'))});
                }}>
                  <option>Selecione uma opção</option>
                  {categoryTypes.map((categoryType) => (
                    <option key={categoryType.id} data-key={categoryType.id}>{categoryType.name}</option>
                    ))
                  }
              </Form.Control>
            </Form.Group>

          </Form.Row>
          <Form.Row as={Col} md="2">
            <ButtonForm
              loading={loading}
              onClick={saveCategory}
              title={"Salvar"}/>
          </Form.Row>
        </Form>
      </S.FormDiv>

      
      <Table 
        header={header}
        datas={categories}
        itemSelected={category.id}
        action={true}
        editValues={editValues}
        deleteValues={deleteValues}/>


    </S.CadastroBancoWrapper>
  );
}

export default CadastroCategoriaPage;