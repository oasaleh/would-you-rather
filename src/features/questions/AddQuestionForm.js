import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectAuthUser, fetchUsers } from '../users/usersSlice';
import { addQuestion } from './questionsSlice';
import './style.css';

const AddQuestionForm = () => {
  const dispatch = useDispatch();
  const authUser = useSelector(selectAuthUser);
  const history = useHistory();
  const [optionOne, setOptionOne] = useState('');
  const [optionTwo, setOptionTwo] = useState('');

  function handleChange(e) {
    // eslint-disable-next-line no-unused-expressions
    e.target.name === 'optionOne'
      ? setOptionOne(e.target.value)
      : setOptionTwo(e.target.value);
  }
  function handleClick(e) {
    e.preventDefault();
    dispatch(
      addQuestion({
        author: authUser.id,
        optionOneText: optionOne,
        optionTwoText: optionTwo,
      }),
    );
    dispatch(fetchUsers());
    history.push(`/home`);
  }

  return (
    <form>
      <h3>Would you rather?</h3>
      <label htmlFor="optionOne">
        Option One:{' '}
        <input
          type="text"
          name="optionOne"
          id="optionOne"
          value={optionOne}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="optionTwo">
        Option Two:{' '}
        <input
          type="text"
          name="optionTwo"
          id="optionTwo"
          value={optionTwo}
          onChange={handleChange}
        />
      </label>
      <button type="button" onClick={handleClick}>
        Add Question
      </button>
    </form>
  );
};

export default AddQuestionForm;
