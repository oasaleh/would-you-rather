import './style.css';

const UserCard = ({ user }) => {
  return (
    <div className="userCard">
      <div className="userInfo">
        <div className="imgContainer">
          <img src={user.avatarURL} alt={`${user.name}`} />
        </div>
        <div>{user.name}</div>
      </div>
      <h4>Questions</h4>
      <div className="questionsInfo">
        <div>Asked {user.questions.length}</div>
        <div>Answered {Object.keys(user.answers).length}</div>
      </div>
    </div>
  );
};

export default UserCard;
