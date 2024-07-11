// src/features/todos/TodoForm.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/slice/todoSlice';

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  endDate: yup.string().required('End date is required'),
});

const TodoForm = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = data => {
    dispatch(addTodo({
      title: data.title,
      description: data.description,
      endDate: data.endDate,
      isCompleted: data.isCompleted || false,
    }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Title</label>
        <input {...register('title')} />
        <p>{errors.title?.message}</p>
      </div>
      <div>
        <label>Description</label>
        <input {...register('description')} />
        <p>{errors.description?.message}</p>
      </div>
      <div>
        <label>End Date</label>
        <input type="date" {...register('endDate')} />
        <p>{errors.endDate?.message}</p>
      </div>
      <div>
        <label>Is Completed</label>
        <input type="checkbox" {...register('isCompleted')} />
      </div>
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;
