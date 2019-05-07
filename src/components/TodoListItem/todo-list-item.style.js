import styled, { css } from 'styled-components';

export const StyledTodoListItem = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
`;

export const ColorIndicator = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: ${({ color }) => color};
  margin-right: 8px;
`;

export const StyledItemCard = styled.div`
  font-size: 12px;
  height: 80px;
  width: 80%;
  border-radius: 4px;
  opacity: 1;
  opacity: ${({ complete }) => complete && 0.5};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: 1s;
`;

export const StyledItemCardHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledCompleteButtonGroup = styled.div`
  display: flex; 
  flex-direction: column;
  align-items: center;
`;

export const StyledInfoGroup = styled.div`
  display: flex;
  min-width: 150px;
  justify-content: flex-end;
`;

export const StyledItemTitle = styled.div`
  display: flex;
  align-items: center;
  color: black;
  font-weight: bold;
  padding: 3px;
  min-height: 20px;
  width: 150px;
  h3 {
    ${({ complete }) => complete && css`text-decoration: line-through;`}
  }
`;

export const StyledItemDescription = styled.div`
  color: rgba(10, 10, 10, 0.8);
`;



export const StyledItemCardFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;