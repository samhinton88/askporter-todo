import { 
  TODO_DELETE,
  TODO_ADD,
  TODO_UPDATE
} from './types';

export const addTodo = (data) => ({ type: TODO_ADD, payload: { ...data, complete: false } })


export const updateTodo = (id, data) => ({ type: TODO_UPDATE, id, payload: data });

export const deleteTodo = id => ({ type: TODO_DELETE, id })
