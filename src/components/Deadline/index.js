import React from "react";
import * as S from "./styled"

import Line from "../Line";
import Title from "../Title";
import check from "../../image/check.svg"
import edit from "../../image/edit.svg"
import moment from "moment";

import {data} from "../../components/Deadline/data"

const Deadline = (props) => {
  return (
    <S.DeadlineWrapper>
      {props.goals.map((d, index) => {
        return(
          <S.DeadLineGroup>
      <S.DeadlineHeaderWrapper>
        <S.DeadlineHeaderDateWrapper>
          {index % 2 == 0 ? (
            <>
              <S.DeadlineHeaderDate>
                {"DeadLine: " + moment(d.deadline).format("DD/MM/YYYY")}
              </S.DeadlineHeaderDate>
              <Line />
            </>
          ) : ''
          }
        </S.DeadlineHeaderDateWrapper>

        <S.DeadlineHeaderMiddleWrapper status={d.status}/>

        <S.DeadlineHeaderDateWrapper>
        {index % 2 == 1 ? (
            <>
              <S.DeadlineHeaderDate>
                 {"DeadLine: " + moment(d.deadline).format("DD/MM/YYYY")}
              </S.DeadlineHeaderDate>
              <Line />
            </>
          ) : ''
          }
        </S.DeadlineHeaderDateWrapper>
          </S.DeadlineHeaderWrapper>
          <S.DeadLineBodyGroup>
          {index % 2 == 1 ? (
              <S.DeadLineBodyWrapper />
          ) : ''
          }
            <S.DeadLineBodyWrapper dashedBorder={index % 2 == 1 ? 'right': 'left'}>
              <S.DeadlineBodyTitleWrapper>
                <Title title={d.title} size={22}/>
              </S.DeadlineBodyTitleWrapper>
              <S.DeadlineBodyDescriptionWrapper>
                <S.DeadlineBodyDescription value={d.description}>
                </S.DeadlineBodyDescription>
              </S.DeadlineBodyDescriptionWrapper>
              <S.DeadlineBodyIconsWrapper>
              <S.DeadLineIcon onClick={() => props.alterarStatus(d.id)}>
                <S.DeadLineIconCheck src={check}/>
              </S.DeadLineIcon>
              <S.DeadLineIcon onClick={() => props.editValues(d.id)}>
                <S.DeadLineIconEdit src={edit}/>
              </S.DeadLineIcon>
              </S.DeadlineBodyIconsWrapper>
          </S.DeadLineBodyWrapper>
        {index % 2 == 0 ? (
          <S.DeadLineBodyWrapper />
          ) : ''
        }
        </S.DeadLineBodyGroup>
      </S.DeadLineGroup>
        );
      })}      
    </S.DeadlineWrapper>
  );
}

export default Deadline;