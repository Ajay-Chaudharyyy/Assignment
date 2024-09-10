import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, deleteTodo, updateTodo, clearAllTodos } from '../Redux/Slices/todoSlice';
import './Container.css';
import Card from './Card';
import { FcDeleteColumn } from "react-icons/fc";

const Container = () => {
  const [text, setText] = React.useState('');
  const todos = useSelector(state => state.todos.items);
  const dispatch = useDispatch();

  const ChangeHandler = (event) => {
    setText(event.target.value);
  };

  const AddHandler = () => {
    if (text.trim()) {
      dispatch(addTodo(text));
      setText(''); // Clear input field after adding
    }
  };

  const DeleteHandler = (index) => {
    dispatch(deleteTodo(index));
  };

  const UpdateHandler = (index, updatedText) => {
    dispatch(updateTodo({ index, updatedText }));
  };

  return (
    <div className='main-div'>
      <div className='nav-bar'>
        <div className='input-div'>
          <input
            type='text'
            placeholder='What do you need to do?'
            className='inputText'
            value={text}
            onChange={ChangeHandler}
          />
          <button className='addBtn' onClick={AddHandler}>ADD</button>
        </div>
      </div>
      <div className='main-body'>
        {todos.length > 0 ? (
          <div className='notes'>
            {todos.map((data, index) => (
              <Card
                key={index}
                data={data}
                index={index}
                DeleteHandler={DeleteHandler}
                UpdateHandler={UpdateHandler}
              />
            ))}
          </div>
        ) : (
          <div></div>
        )}
        {todos.length > 1 && (
          <div className='deleteAll'>
            <FcDeleteColumn size={50} className='i' onClick={() => dispatch(clearAllTodos())} />
            <p onClick={() => dispatch(clearAllTodos())}>Complete Delete</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Container;
