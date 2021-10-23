import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import {
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from '../../utilities/_DATA';

const initialState = { questions: [], status: 'idle', error: null };

export const fetchQuestions = createAsyncThunk(
  'questions/fetchQuestions',
  async () => {
    const response = await _getQuestions();
    // console.log(response);
    // Converting response from being an array of ONE object -- that has
    // many objects -- to an array of objects.
    const questions = Object.keys(response).map((key) => response[key]);

    return questions;
  },
);
export const addQuestion = createAsyncThunk(
  'questions/addQuestion',
  async (question) => {
    const savedQuestion = await _saveQuestion(question);
    return savedQuestion;
  },
);
export const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    another: (state, action) => {
      state.questions.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchQuestions.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched posts to the array
        state.questions = state.questions.concat(action.payload);
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addQuestion.fulfilled, (state, action) => {
        state.questions.push(action.payload);
      });
  },
});

// selectors
export const getAllQuestions = (state) => state.questions.questions;
export const selectQuestionById = (state, questionId) =>
  state.questions.questions.find((question) => question.id === questionId);

export const { another } = questionsSlice.actions;
export default questionsSlice.reducer;
