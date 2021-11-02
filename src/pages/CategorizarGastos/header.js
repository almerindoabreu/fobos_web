export const header = 
[
  {
    columnName: "Nome do Pagamento", 
    field: "name",
  },
  {
    columnName: "Valores", 
    field: "value",
    type: "money",
  },
  {
    columnName: "Descrição", 
    field: "description",
  },
  {
    columnName: "Categoria", 
    field: "category.name",
  },
  {
    columnName: "Tipo de Categoria", 
    field: "category.categoryType.name",
  },
  {
    columnName: "Data", 
    field: "date",
    type: "date",
  },
  {
    columnName: "Cartão", 
    field: "card.name",
  }
];