import React from 'react';
import { connect } from 'react-redux';
import { updateTodo, deleteTodo, toggleFormVisible } from '../../actions';
import { 
  StyledCompleteButtonGroup,
  StyledItemCard,
  StyledItemCardHeader,
  StyledItemCardFooter,
  StyledItemDescription,
  StyledItemTitle,
  ColorIndicator,
  StyledTodoListItem,
  StyledInfoGroup
} from './todo-list-item.style'
import Person from '../icons/person';
import Location from '../icons/location';
import CheckIcon from './check-icon';
import DeleteIcon from './delete-icon';
import WriteIcon from '../icons/write-icon';

const TodoListItem = (props) => {
  const { 
    title, 
    description, 
    complete, 
    id, 
    dispatch, 
    isTop,
    people,
    location,
    color
  } = props;

  return (
    <StyledTodoListItem>
      <StyledItemCard isTop={ isTop } complete={ complete }>
      <StyledItemCardHeader>
        <StyledItemTitle complete={ complete } >
          <ColorIndicator color={ color }/>
          <h3>{title}</h3> 
        </StyledItemTitle>
        <StyledItemDescription>
        <StyledCompleteButtonGroup>
          {
            !complete && (
              <>
                <CheckIcon 
                  onClick={() => dispatch(updateTodo(id, { ...props, complete: true}))} 
                  fill={'black'}
                />
                <label>Mark as Complete:</label>
              </>
            )
          }
        </StyledCompleteButtonGroup>
          {description}
        </StyledItemDescription>
        <StyledInfoGroup>
          { people.map((p, i) => <>{p}<Person/></>)}
          { location && <>{location}<Location/></> }
        </StyledInfoGroup>
      </StyledItemCardHeader>
      <StyledItemCardFooter>
        <StyledInfoGroup>
          <DeleteIcon onClick={() => dispatch(deleteTodo(id))} />
          <WriteIcon onClick={() => dispatch(toggleFormVisible(props))}/>
        </StyledInfoGroup>
      </StyledItemCardFooter>
      </StyledItemCard>
    </StyledTodoListItem>
  )
}

export default connect()(TodoListItem);
