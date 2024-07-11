// src/features/todos/TodoList.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { deleteTodo, editTodo, toggleCompletion } from '../redux/slice/todoSlice';


const TodoList = () => {
  const todos = useSelector(state => state.todos.todos);
  const dispatch = useDispatch();

  const columnDefs = [
    { headerName: 'Title', field: 'title' },
    { headerName: 'Description', field: 'description' },
    { headerName: 'End Date', field: 'endDate' },
    { headerName: 'Is Completed', field: 'isCompleted', cellRenderer: params => params.value ? 'Yes' : 'No' },
    { headerName: 'Actions', cellRendererFramework: (params) => (
      <div>
        <button onClick={() => handleEdit(params.data)}>Edit</button>
        <button onClick={() => handleDelete(params.data.id)}>Delete</button>
      </div>
    )}
  ];

  const handleEdit = (todo) => {
    const updatedTodo = { ...todo, title: prompt('Edit title', todo.title) };
    dispatch(editTodo(updatedTodo));
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
      <AgGridReact
        rowData={todos}
        columnDefs={columnDefs}
        defaultColDef={{ sortable: true, filter: true }}
      />
    </div>
  );
};

export default TodoList;
