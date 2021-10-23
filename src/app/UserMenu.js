function UserMenu({ handleClick }) {
  return (
    <div>
      <button type="button" value="allQuestions" onClick={handleClick}>
        All Questions
      </button>
      <button type="button" value="myQuestions" onClick={handleClick}>
        My Questions
      </button>
      <button type="button" value="unansweredQuestions" onClick={handleClick}>
        Unanswered Questions
      </button>
      <button type="button" value="answeredQuestions" onClick={handleClick}>
        Answered Questions
      </button>
    </div>
  );
}

export default UserMenu;
