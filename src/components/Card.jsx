import React, { useRef, useState } from 'react';
import { MdDeleteOutline } from "react-icons/md";
import { ImCheckmark } from "react-icons/im";
import { RxUpdate } from "react-icons/rx";
import { useDispatch } from 'react-redux';
import { updateTodo, deleteTodo } from '../Redux/Slices/todoSlice';
import './Card.css';

const Card = ({ data, index }) => {
  const [tick, setTick] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentText, setCurrentText] = useState(data);
  const itemRef = useRef(null);
  const dispatch = useDispatch();

  const TickHandler = () => {
    setTick(prevTick => !prevTick);
    if (itemRef.current && !isEditing) {
      itemRef.current.style.border = tick ? '2px solid rgb(17, 17, 17)' : '2px solid rgb(219, 89, 41)';
    }
  };

  const handleUpdate = () => {
    if (currentText.trim() !== '') {
      dispatch(updateTodo({
        index,
        updatedText: currentText
      }));
      setIsEditing(false);
    }
  };

  return (
    <div className='eachCard'>
      <div className='cardData'>
        <div
          className='check'
          ref={itemRef}
          onClick={TickHandler}
        >
          {!isEditing && tick && <ImCheckmark className='checkIcon' />}
        </div>
        {isEditing ? (
          <div className='editContainer'>
            <input
              type='text'
              value={currentText}
              onChange={(e) => setCurrentText(e.target.value)}
              className='editInput'
            />
            <button onClick={handleUpdate} className='updateBtn'>Update</button>
          </div>
        ) : (
          <p className={tick ? 'dataPara2' : 'dataPara'}>
            {data.substring(0, 40)}
          </p>
        )}
        <div className='icons'>
          <MdDeleteOutline className='icon' onClick={() => dispatch(deleteTodo(index))} />
          <RxUpdate className='icon' onClick={() => setIsEditing(true)} />
        </div>
      </div>
      <div className='line'></div>
    </div>
  );
};

export default Card;
