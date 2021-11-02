import React from "react";

import * as S from "./styled"


const Pagination = (props) => {
  return (
    <S.WrapperPagination>
      <S.PaginationItem >&laquo;</S.PaginationItem>
      <S.PaginationItem selectedItem={true}> 1 </S.PaginationItem>
      <S.PaginationItem> 2 </S.PaginationItem>
      <S.PaginationItem> 3 </S.PaginationItem>
      <S.PaginationItem> 4 </S.PaginationItem>
      <S.PaginationItem> 5 </S.PaginationItem>
      <S.PaginationItem >&raquo;</S.PaginationItem>
    </S.WrapperPagination>
  );
}

export default Pagination;