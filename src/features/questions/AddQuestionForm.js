import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
  Link,
  useParams,
} from 'react-router-dom';
import {
  getAllUsers,
  selectUserById,
  selectAuthUser,
} from '../users/usersSlice';
import { getAllQuestions, fetchQuestions } from './questionsSlice';
import Time from './Time';
import './style.css';

const AddQuestionForm = ({ question }) => {
  return <>Add Form</>;
};

export default AddQuestionForm;
