import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { toggleFormVisible } from '../../actions';
import ButtonToggle from '../../components/ButtonToggle';
import TodoListColumn from '../../components/TodoListColumn';
import TodoList from '../../components/TodoList';
import Form from '../../components/Form';
import Modal from '../../components/Modal';
import filters from './filters';


const StyledDashboard = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

const StyledColumnContainer = styled.div`
  display: flex;
`;

const Dashboard = ({ dispatch, todos, formVisible }) => {
  const [filter, updateFilter] = useState('all');

  return (
    <StyledDashboard>
      <StyledColumnContainer>
        <ButtonToggle states={ Object.keys(filters)} onSelect={ filter => updateFilter(filter)}/>
        <TodoListColumn title={ 'To Do' }>
          <TodoList 
            status={ 'todo' } 
            items={todos && todos.filter(filters[filter])}
          />
        </TodoListColumn>
      </StyledColumnContainer>
      { 
        formVisible && (
          <Modal onDismiss={() => dispatch(toggleFormVisible())}>
            <Form 
              onDismiss={() => dispatch(toggleFormVisible())}
            />
          </Modal>
        )
      }
    </StyledDashboard>
  )
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
    formVisible: state.ui.formVisible
  }
}

export default connect(mapStateToProps)(Dashboard);
