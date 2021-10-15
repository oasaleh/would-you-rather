import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, selectUserById } from "../users/usersSlice";
import { getAllQuestions, fetchQuestions } from "./questionsSlice";
import Time from "./Time";
import "./questionsListStyle.css";

const QuestionExcerpt = ({ question }) => {
  const user = useSelector((state) => selectUserById(state, question.author));
  return (
    <>
      <div class="questionHeader">
        <h4>{user.name}</h4>
        <Time timestamp={question.timestamp} />
      </div>
      <div class='questionBody'>
        <h5>Would you rather...</h5>
        <div class='questionChoices'>
          <p>{question.optionOne.text}</p>
          <p>{question.optionTwo.text}</p>
        </div>
      </div>
    </>
  );
};

const QuestionsList = () => {
  const dispatch = useDispatch();
  const questions = useSelector(getAllQuestions);

  const questionsStatus = useSelector((state) => state.questions.status);
  const error = useSelector((state) => state.questions.error);

  let content;

  if (questionsStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (questionsStatus === "succeeded") {
    content = questions.map((question) => (
      <QuestionExcerpt
        class="questionContainer"
        key={question.id}
        question={question}
      />
    ));
  } else if (questionsStatus === "failed") {
    content = <p>Failed</p>;
  }
  useEffect(() => {
    if (questionsStatus === "idle") {
      dispatch(fetchQuestions());
    }
  }, [questionsStatus, dispatch]);
  return <article class="questionsListContainer">{content}</article>;
};

export default QuestionsList;
