import React, { useState, useEffect, useRef } from 'react'
import Title from "../../components/Title"
import ButtonForm from "../../components/ButtonForm"
import Feedback from "../../components/Feedback"
import Line from "../../components/Line";
import Table from "../../components/Table";
import { Form, Col, Spinner } from 'react-bootstrap';
import moment from 'moment';
import * as S from "./styled"
import {header} from './header'

import api from "../../services/api"

import ShowcaseButton from './button';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalBarSeries,
  LineMarkSeries,
  VerticalGridLines,
  HorizontalGridLines,
  Hint
} from 'react-vis';



const GraficosPage = () => {

  const [resposta, setResposta] = useState({
    show: false,
    feedback: '',
    text: '',
  });

  const [params, setParams] = useState({
    start: '',
    end: '',
    categories: [],
    categoria: '',
  })

  const [categoriesSelected, setCategoriesSelected ] = useState([]); 
  const [categorySelected, setCategorySelected ] = useState(); 
  const [categories, setCategories ] = useState([]); 
  const [months, setMonths ] = useState([]); 
  const [IGC, setIGC ] = useState([]); 
  const [IGCmonthly, setIGCmonthly ] = useState([]); 
  const [plotIGC, setPlotIGC ] = useState([]); 
  const [plotLineIGC, setPlotLineIGC ] = useState([]); 
  const [categoriesLowerExpenses, setCategoriesLowerExpenses ] = useState([]); 
  const [categoriesHigherExpenses, setCategoriesHigherExpenses ] = useState([]); 
  const [hoveredNode, setHoveredNode] = useState([]);
  const [clickedNode, setClickedNode] = useState({event: [], typeGraphic: '', categoryName: ''});
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    indexCategory();  
    calcLastThreeMonths();
  }, [])

  useEffect(() => {
    transformDataIGC();
  }, [IGC])

  useEffect(() => {
    if(clickedNode.event != null){
      loadStatements();
    }
  }, [clickedNode])

  const calcLastThreeMonths = async () => {
    const response = await api.get("/api/Statement/CalcLastThreeMonthValues");
    console.log(response);
    let higherExpenses = [];
    let lowerExpenses = [];
    let auxLowerExpenses = 0;
    let auxHightExpenses = 0;

    response.data.map((value, i) => {
        if(value.sumAllValues < 0 && auxLowerExpenses < 3){
          console.log('auxLowerExpenses');
          console.log(auxLowerExpenses);
          lowerExpenses.push(value);
          auxLowerExpenses += 1;
        }
        console.log('auxLowerExpenses');
        console.log(auxLowerExpenses);
    })
    
    response.data.slice(0).reverse().map((value, i) => {
        if(value.sumAllValues < 0 && auxHightExpenses < 3){
          higherExpenses.push(value);
          auxHightExpenses += 1;
        }
    })
    setCategoriesLowerExpenses(lowerExpenses);
    setCategoriesHigherExpenses(higherExpenses);
  }

  const indexCategory = async () => {
    const response = await api.get("/api/Category/Categories");
    setCategories(response.data);
  }

  const loadIGC = async () => {
    const response = await api.get("/api/Statement/CalcStatementsCategories/"+ params.start + "&" + params.end);
    setIGC(response.data);
    loadMonthlyIGC();
    loadMonths();
  }

  const loadMonthlyIGC = async () => {
    const response = await api.get("/api/Statement/CalcMonthlyStatementsCategories/"+ params.start + "&" + params.end);
    setIGCmonthly(response.data);
  }

  const loadMonths = async () => {
    let months = [];
    let start = getAbsoluteMonths(moment(params.start));
    let end = getAbsoluteMonths(moment(params.end));

    let qtdMonths = end - start;

    for(var i = 0; i <= qtdMonths; i++){
      console.log(i);
      months.push(moment(params.start).add((i), 'months').format('M/YYYY'));
    }

    console.log("months");
    console.log(months);
    setMonths(months);
  }

  const loadStatements = async () => {
    if(clickedNode.typeGraphic == "IGC"){
      const response = await api.get("/api/Statement/Show/Graphic/IGC/StatementByCategory/"+ clickedNode.event.x + "&" + params.start + "&" + params.end);
      setData(response.data);
    } if(clickedNode.typeGraphic == "IGC_Monthly"){
      let formatterCaracter = clickedNode.event.x.split('/');
      const response = await api.get("/api/Statement/Show/Graphic/IGC/MonthlyStatementByCategory/"+ clickedNode.categoryName + "&" + formatterCaracter[0] + '-' + formatterCaracter[1]);
      setData(response.data);
    }
  }

  function getAbsoluteMonths(momentDate) {
    var months = Number(momentDate.format("MM"));
    var years = Number(momentDate.format("YYYY"));
    return months + (years * 12);
  }

  const transformDataIGC = async () => {
    let dataFormatted = [];
    categories.map(category => {
      let flag = 0;
      for (const value of IGC){
        if(category.name == value.categoryName && value.sumAllValues < 0){
          flag = 1;
          dataFormatted.push({x: value.categoryName, y: (value.sumAllValues < 0 ? value.sumAllValues * -1 : value.sumAllValues)});
        }
      }
      if(flag == 0 && category.sumAllValues <= 0){
        dataFormatted.push({x: category.name, y: 0});
      }
    });
    setPlotIGC(dataFormatted);
  }

    const transformDataMonthlyIGC = async (categories) => {
      let dataFormatted = [];
      categories.map(category => {
        let linePlot = [];
        for (const value of IGCmonthly){
          if(category == value.categoryName){
            console.log('value.StatementMonth');
            console.log(value.statementMonth);
            console.log('value');
            console.log(value);
            linePlot.push({x: value.statementMonth, y: (value.sumAllValues < 0 ? value.sumAllValues * -1 : value.sumAllValues), categoryName: value.categoryName});
          }
        }
        dataFormatted.push(linePlot);
      });
      
    console.log("linePlot");
    console.log(dataFormatted);
    setPlotLineIGC(dataFormatted);
  }

  const  addCategorieInLinePlotIGC = async (category) => {
    if(category){
      let categories = categoriesSelected;
      categories.push(category);
      console.log(categories);
      transformDataMonthlyIGC(categories);
    }
  }

  const removeCategorieInLinePlotIGC = async (index) => {
    if(index >= 0){
      console.log(index);
      categoriesSelected.splice(index, 1);
      transformDataMonthlyIGC(categoriesSelected);
    }
  }


    return (
      <S.IGPWrapper>
      <Title title={"IGC - Índice de Gastos por Categorias"} size={42}/>
      <Feedback resposta={resposta} setResposta={setResposta}/>
      <S.FormDiv >
        <Form className="mb-2">
          <Form.Row>
            <Form.Group as={Col} md="3" controlId="inicio">
                <Form.Label>Início</Form.Label>
                <Form.Control type="date"  
                value={params.start}
                onChange={event => {
                  setParams({...params, start: event.target.value})
                }}/>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="termino">
                <Form.Label>Término</Form.Label>
                <Form.Control type="date"  
                value={params.end}
                onChange={event => {
                  setParams({...params, end: event.target.value})
                }}/>
              </Form.Group>
          </Form.Row>
         
          <Form.Row as={Col} md="2">
            <ButtonForm onClick={loadIGC} title={"Pesquisar"}></ButtonForm>
          </Form.Row>

          </Form>
        </S.FormDiv>

        <Title title={"Gastos por Categorias"} size={20}/>
      
     <XYPlot style={{width: "100%"}} margin={{bottom: 100}} xType="ordinal" width={1000} height={400}>
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis tickLabelAngle={-45} />
      <YAxis />
      <VerticalBarSeries
        data={plotIGC}
        onValueClick={e => setClickedNode({event: e, typeGraphic: 'IGC'})}
        onValueMouseOver={e => setHoveredNode(e)}
        onValueMouseOut={(e) => setHoveredNode(null)}
      />
        {hoveredNode && (
            <Hint
              getX={d => d.Categoria}
              getY={d => d.Valores}
              value={{
                Categoria: hoveredNode.x,
                Valores: hoveredNode.y,
              }}
            />
          )}
    </XYPlot>
    <Line />

    <Title title={"Projeção de Categorias"} size={20}/>
    <S.FormDiv >
        <Form className="mb-2">
          <Form.Row>
            <Form.Group as={Col} md="3" controlId="categoria">
                <Form.Label>Categoria</Form.Label>
                <Form.Control as="select"  value={categorySelected}
                  onChange={event => {
                    setCategorySelected(event.target.value)
                  }}>
                  <>
                    <option></option>
                    {categories.map((category) => (
                      <option>{category.name}</option>
                      ))
                    }
                  </>
                </Form.Control>
              </Form.Group>
              <Form.Group style={{paddingTop: "24px"}} as={Col} md="3" controlId="button_adicionar_categoria">
                <ButtonForm  onClick={() => addCategorieInLinePlotIGC(categorySelected)} title={"Adicionar Categoria"}></ButtonForm>
              </Form.Group>
          </Form.Row>
         
          </Form>
        </S.FormDiv>
    <S.IGPWrapper>
    <XYPlot style={{width: "100%"}} margin={{bottom: 50}} 
      xType="ordinal" width={1000} height={400}
      xDomain={months}>
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis tickLabelAngle={-45} title="Mês/Ano"/>
      <YAxis title="Gastos em R$"/>
      {plotLineIGC.map((line, index) => (
        <LineMarkSeries
          className="first-series"
          data={line}
          style={{
            strokeLinejoin: 'round',
            strokeWidth: 4,
            color: 
              ( index == 0 ? "#10B2AE" : 
                index == 1 ? "#9E0616" : 
                             "#120A8F"
              )
          }}
          onValueClick={e => setClickedNode({event: e, typeGraphic: 'IGC_Monthly', categoryName: line[0].categoryName})}
          onValueMouseOver={(e) => setHoveredNode(e)}
          onValueMouseOut={(e) => setHoveredNode(null)}
        />
        ))}

      {hoveredNode && (
        <Hint
          getX={d => d.Categoria}
          getY={d => d.Valores}
          value={{
            Categoria: hoveredNode.x,
            Valores: hoveredNode.y,
          }}
        />
      )}

    </XYPlot>
    <S.WrapperLegend>
      <S.LegendText>Legenda</S.LegendText>
      <S.LegendWrapper>
        {categoriesSelected.map((category, index) => {
          return (
            <S.LegendItemGroup>
              <S.LegendCategory>{category}</S.LegendCategory>
              <S.LegendColor colorIndex={index}/>
              <S.LegendRemoveCategory onClick={() => removeCategorieInLinePlotIGC(index)}>Remover</S.LegendRemoveCategory>
            </S.LegendItemGroup>
          );
          })
        }
      </S.LegendWrapper>
    </S.WrapperLegend>

    </S.IGPWrapper>

    <Line />

    <Title title={"Resumo IGP"} size={20}/>
    <S.IGPWrapper>
      <S.ResumoWrapper>
        <S.ResumoWrapperGroup>
          <S.ResumoGroup>
            <S.ResumoTitle>Maiores gastos dos últimos 3 meses</S.ResumoTitle>
            <S.ResumeWrapperCategory>
              {categoriesLowerExpenses.map(category => {
                    return (
                      <S.GroupResumeCategory>
                        <S.ResumeCategory>{category.categoryName}</S.ResumeCategory>
                        <S.ResumeValue>{category.sumAllValues.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</S.ResumeValue>
                      </S.GroupResumeCategory>
                    )
                  })
                }
            </S.ResumeWrapperCategory>
          </S.ResumoGroup>

          <S.ResumoGroup>
            <S.ResumoTitle>Categorias com tendência de aumento de gasto</S.ResumoTitle>

          </S.ResumoGroup>

        </S.ResumoWrapperGroup>
        <S.ResumoWrapperGroup>
          <S.ResumoGroup>
            <S.ResumoTitle>Menores gastos dos últimos 3 meses</S.ResumoTitle>
            <S.ResumeWrapperCategory>
                {categoriesHigherExpenses.map(category => {
                  return (
                    <S.GroupResumeCategory>
                      <S.ResumeCategory>{category.categoryName}</S.ResumeCategory>
                      <S.ResumeValue>{category.sumAllValues.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</S.ResumeValue>
                    </S.GroupResumeCategory>
                  )
                })
              }
            </S.ResumeWrapperCategory>
          </S.ResumoGroup>
          <S.ResumoGroup>
            <S.ResumoTitle>Categorias com valores estabilizados</S.ResumoTitle>
          </S.ResumoGroup>
        </S.ResumoWrapperGroup>
      </S.ResumoWrapper>
      <Line />
      <Title title={"Dados Selecionados"} size={20}/>
      <Table header={header} datas={data} action={false}  />
    </S.IGPWrapper>
    </S.IGPWrapper>
    );
  }

export default GraficosPage;